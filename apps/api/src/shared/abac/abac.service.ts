import { PolicyEffect, PolicyEntity } from '@/database/entities/policy.entity';
import {
  ResourceAttributesEntity,
  ResourceType,
} from '@/database/entities/resource-attributes.entity';
import { UserAttributesEntity } from '@/database/entities/user-attributes.entity';
import { I18nTranslations } from '@/generated/i18n.generated';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { Repository } from 'typeorm';

export interface AbacContext {
  userId: string;
  resourceType: ResourceType;
  resourceId: string;
  action: string;
}

export interface PermissionRule {
  resourceType: ResourceType;
  resourceId: string;
  actions: string[];
}

@Injectable()
export class AbacService {
  private readonly logger = new Logger(AbacService.name);

  constructor(
    private readonly i18nService: I18nService<I18nTranslations>,
    @InjectRepository(PolicyEntity)
    private readonly policyRepository: Repository<PolicyEntity>,
    @InjectRepository(UserAttributesEntity)
    private readonly userAttributesRepository: Repository<UserAttributesEntity>,
    @InjectRepository(ResourceAttributesEntity)
    private readonly resourceAttributesRepository: Repository<ResourceAttributesEntity>,
  ) {}

  async checkPermission(context: AbacContext): Promise<boolean> {
    const userAttributes = await this.getUserAttributes(context.userId);
    this.logger.log(`User attributes: ${JSON.stringify(userAttributes)}`);

    const resourceAttributes = await this.getResourceAttributes(
      context.resourceType,
      context.resourceId,
    );

    this.logger.log(
      `Resource attributes: ${JSON.stringify(resourceAttributes)}`,
    );

    const policies = await this.getApplicablePolicies(context.action);

    this.logger.log(`Policies: ${JSON.stringify(policies)}`);
    let hasPermission = false;
    let isDenied = false;

    for (const policy of policies) {
      const policyContext = {
        user: userAttributes,
        resource: resourceAttributes,
        action: context.action,
        resourceType: context.resourceType,
        resourceId: context.resourceId,
      };

      if (this.evaluateCondition(policy.condition, policyContext)) {
        if (policy.effect === PolicyEffect.ALLOW) {
          hasPermission = true;
        } else if (policy.effect === PolicyEffect.DENY) {
          isDenied = true;
          break;
        }
      }
    }

    return hasPermission && !isDenied;
  }

  async grantPermissions(
    userId: string,
    permissions: PermissionRule[],
  ): Promise<void> {
    await this.ensureUserAttributes(userId);

    for (const permission of permissions) {
      await this.ensureResourceAttributes(
        permission.resourceType,
        permission.resourceId,
      );

      for (const action of permission.actions) {
        const policy = this.policyRepository.create({
          effect: PolicyEffect.ALLOW,
          action,
          condition: {
            'user.id': userId,
            'resource.type': permission.resourceType,
            'resource.id': permission.resourceId,
          },
          name: `User ${userId} ${action} on ${ResourceType[permission.resourceType]} ${permission.resourceId}`,
          description: `Auto-generated policy for user access`,
          isActive: true,
          priority: 100,
        });

        await this.policyRepository.save(policy);
      }
    }
  }

  async revokePermissions(
    userId: string,
    permissions: PermissionRule[],
  ): Promise<void> {
    for (const permission of permissions) {
      for (const action of permission.actions) {
        await this.policyRepository.delete({
          effect: PolicyEffect.ALLOW,
          action,
          condition: {
            'user.id': userId,
            'resource.type': permission.resourceType,
            'resource.id': permission.resourceId,
          },
        });
      }
    }
  }

  private async getUserAttributes(
    userId: string,
  ): Promise<Record<string, any>> {
    const userAttributes = await this.userAttributesRepository.findOne({
      where: { userId },
    });

    return {
      id: userId,
      ...userAttributes?.attributes,
    };
  }

  private async getResourceAttributes(
    resourceType: ResourceType,
    resourceId: string,
  ): Promise<Record<string, any>> {
    const resourceAttributes = await this.resourceAttributesRepository.findOne({
      where: { resourceType, resourceId },
    });

    return {
      type: resourceType,
      id: resourceId,
      ...resourceAttributes?.attributes,
    };
  }

  private async getApplicablePolicies(action: string): Promise<PolicyEntity[]> {
    return this.policyRepository.find({
      where: [
        { action, isActive: true },
        { action: '*', isActive: true }, // Wildcard actions
      ],
      order: { priority: 'DESC' },
    });
  }

  private evaluateCondition(
    condition: Record<string, any>,
    context: Record<string, any>,
  ): boolean {
    for (const [key, expectedValue] of Object.entries(condition)) {
      const actualValue = this.getNestedValue(context, key);

      if (Array.isArray(expectedValue)) {
        if (!expectedValue.includes(actualValue)) {
          return false;
        }
      } else if (actualValue !== expectedValue) {
        return false;
      }
    }

    return true;
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  private async ensureUserAttributes(userId: string): Promise<void> {
    const existing = await this.userAttributesRepository.findOne({
      where: { userId },
    });

    if (!existing) {
      const userAttributes = this.userAttributesRepository.create({
        userId,
        attributes: {},
      });
      await this.userAttributesRepository.save(userAttributes);
    }
  }

  private async ensureResourceAttributes(
    resourceType: ResourceType,
    resourceId: string,
  ): Promise<void> {
    const existing = await this.resourceAttributesRepository.findOne({
      where: { resourceType, resourceId },
    });

    if (!existing) {
      const resourceAttributes = this.resourceAttributesRepository.create({
        resourceType,
        resourceId,
        attributes: {},
      });
      await this.resourceAttributesRepository.save(resourceAttributes);
    }
  }
}

import { ResourceType } from '@/database/entities/resource-attributes.entity';
import { CurrentUserSession } from '@/decorators/auth/current-user-session.decorator';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { AbacService } from './abac.service';
import { OrganizationAction, ProjectAction } from './abac.types';

export interface AbacRequirement {
  resourceType: ResourceType;
  action: OrganizationAction | ProjectAction;
  resourceIdParam?: string;
}

export const ABAC_REQUIREMENT_KEY = 'abac_requirement';

export const RequireAbac = (requirement: AbacRequirement) =>
  SetMetadata(ABAC_REQUIREMENT_KEY, requirement);

@Injectable()
export class AbacGuard implements CanActivate {
  private readonly logger = new Logger(AbacGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly abacService: AbacService,
    private readonly i18nService: I18nService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requirement = this.reflector.get<AbacRequirement>(
      ABAC_REQUIREMENT_KEY,
      context.getHandler(),
    );

    this.logger.log(`Requirement: ${JSON.stringify(requirement)}`);

    if (!requirement) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: CurrentUserSession['user'] = request.user;

    if (!user) {
      throw new ForbiddenException(
        this.i18nService.t('organization.insufficientPermissions'),
      );
    }

    const resourceId = requirement.resourceIdParam
      ? request.params[requirement.resourceIdParam]
      : null;

    if (!resourceId) {
      throw new ForbiddenException(
        this.i18nService.t('organization.insufficientPermissions'),
      );
    }

    const hasPermission = await this.abacService.checkPermission({
      userId: user.id,
      resourceType: requirement.resourceType,
      resourceId,
      action: requirement.action,
    });

    if (!hasPermission) {
      throw new ForbiddenException(
        this.i18nService.t('organization.insufficientPermissions'),
      );
    }

    return true;
  }
}

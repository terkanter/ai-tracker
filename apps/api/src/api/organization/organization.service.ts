import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Uuid } from '@/common/types/common.type';
import { OrganizationMemberModel } from '@/database/models/organization-member.model';
import { OrganizationModel } from '@/database/models/organization.model';
import { ResourceType } from '@/database/models/resource-attributes.model';
import { I18nTranslations } from '@/generated/i18n.generated';
import { AbacService } from '@/shared/abac/abac.service';
import { OrganizationAction, ProjectAction } from '@/shared/abac/abac.types';
import { paginate } from '@/utils/pagination/offset-pagination';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import {
  AddMemberDto,
  OrganizationMemberDto,
  UpdateMemberRoleDto,
} from './dto/organization-member.dto';
import {
  OrganizationDto,
  QueryOrganizationsOffsetDto,
} from './dto/organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly i18nService: I18nService<I18nTranslations>,
    private readonly abacService: AbacService,
    @InjectRepository(OrganizationModel)
    private readonly organizationRepository: Repository<OrganizationModel>,
    @InjectRepository(OrganizationMemberModel)
    private readonly organizationMemberRepository: Repository<OrganizationMemberModel>,
  ) {}

  async findAllOrganizations(
    dto: QueryOrganizationsOffsetDto,
  ): Promise<OffsetPaginatedDto<OrganizationDto>> {
    const query = this.organizationRepository
      .createQueryBuilder('organization')
      .orderBy('organization.createdAt', 'DESC');

    const [data, pagination] = await paginate(query, dto);

    return new OffsetPaginatedDto(
      data.map((organization) => organization.toDto(OrganizationDto)),
      pagination,
    );
  }

  async findOneOrganization(id: Uuid): Promise<OrganizationDto> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });

    if (!organization) {
      throw new NotFoundException(this.i18nService.t('organization.notFound'));
    }

    return organization.toDto(OrganizationDto);
  }


  async createOrganization(
    dto: CreateOrganizationDto,
    creatorUserId: string,
  ): Promise<OrganizationDto> {

    const organization = this.organizationRepository.create(dto);
    const savedOrganization =
      await this.organizationRepository.save(organization);

    const member = this.organizationMemberRepository.create({
      userId: creatorUserId,
      organizationId: savedOrganization.id,
      joinedAt: new Date(),
    });

    await this.organizationMemberRepository.save(member);

    await this.abacService.grantPermissions(creatorUserId, [
      {
        resourceType: ResourceType.ORGANIZATION,
        resourceId: savedOrganization.id,
        actions: [
          OrganizationAction.READ,
          OrganizationAction.WRITE,
          OrganizationAction.DELETE,
          OrganizationAction.MANAGE,
          OrganizationAction.INVITE,
          OrganizationAction.REMOVE_MEMBERS,
        ],
      },
    ]);

    return savedOrganization.toDto(OrganizationDto);
  }

  async updateOrganization(
    id: Uuid,
    dto: UpdateOrganizationDto,
    userId: string,
  ): Promise<OrganizationDto> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });

    if (!organization) {
      throw new NotFoundException(this.i18nService.t('organization.notFound'));
    }


    Object.assign(organization, dto);
    const updatedOrganization =
      await this.organizationRepository.save(organization);

    return updatedOrganization.toDto(OrganizationDto);
  }

  async deleteOrganization(id: Uuid, userId: string): Promise<void> {
    const result = await this.organizationRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException(this.i18nService.t('organization.notFound'));
    }
  }

  async getOrganizationMembers(
    organizationId: Uuid,
    userId: string,
  ): Promise<OrganizationMemberDto[]> {
    const members = await this.organizationMemberRepository.find({
      where: { organizationId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    return members.map((member) => member.toDto(OrganizationMemberDto));
  }

  async addMember(
    organizationId: Uuid,
    dto: AddMemberDto,
    requesterId: string,
  ): Promise<OrganizationMemberDto> {
    const existingMember = await this.organizationMemberRepository.findOne({
      where: { organizationId, userId: dto.userId },
    });

    if (existingMember) {
      throw new ConflictException(
        this.i18nService.t('organization.memberExists'),
      );
    }

    const member = this.organizationMemberRepository.create({
      organizationId,
      userId: dto.userId,
      joinedAt: new Date(),
    });

    const savedMember = await this.organizationMemberRepository.save(member);
    return savedMember.toDto(OrganizationMemberDto);
  }

  async updateMemberRole(
    organizationId: Uuid,
    memberId: Uuid,
    dto: UpdateMemberRoleDto,
    requesterId: string,
  ): Promise<OrganizationMemberDto> {
    const member = await this.organizationMemberRepository.findOne({
      where: { id: memberId, organizationId },
    });

    if (!member) {
      throw new NotFoundException(
        this.i18nService.t('organization.memberNotFound'),
      );
    }

    const updatedMember = await this.organizationMemberRepository.save(member);

    return updatedMember.toDto(OrganizationMemberDto);
  }

  async removeMember(
    organizationId: Uuid,
    memberId: Uuid,
    requesterId: string,
  ): Promise<void> {
    const member = await this.organizationMemberRepository.findOne({
      where: { id: memberId, organizationId },
    });

    if (!member) {
      throw new NotFoundException(
        this.i18nService.t('organization.memberNotFound'),
      );
    }

    await this.organizationMemberRepository.softDelete(memberId);
  }
}

import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { ProjectModel } from '@/database/models/project.model';
import { ResourceType } from '@/database/models/resource-attributes.model';
import { I18nTranslations } from '@/generated/i18n.generated';
import { AbacService } from '@/shared/abac/abac.service';
import { OrganizationAction, ProjectAction } from '@/shared/abac/abac.types';
import { paginate } from '@/utils/pagination/offset-pagination';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDto, QueryProjectsOffsetDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly i18nService: I18nService<I18nTranslations>,
    private readonly abacService: AbacService,
    @InjectRepository(ProjectModel)
    private readonly projectRepository: Repository<ProjectModel>,
  ) {}

  async findAllProjects(
    dto: QueryProjectsOffsetDto,
    userId?: string,
  ): Promise<OffsetPaginatedDto<ProjectDto>> {
    if (dto.organizationId && userId) {
      const hasAccess = await this.abacService.checkPermission({
        userId,
        resourceType: ResourceType.ORGANIZATION,
        resourceId: dto.organizationId,
        action: OrganizationAction.READ,
      });

      if (!hasAccess) {
        throw new ForbiddenException(
          this.i18nService.t('organization.insufficientPermissions'),
        );
      }
    }

    const query = this.projectRepository
      .createQueryBuilder('project')
      .orderBy('project.createdAt', 'DESC');

    if (dto.organizationId) {
      query.where('project.organizationId = :organizationId', {
        organizationId: dto.organizationId,
      });
    }

    if (dto.status) {
      query.andWhere('project.status = :status', { status: dto.status });
    }

    const [data, pagination] = await paginate(query, dto);

    return new OffsetPaginatedDto(
      data.map((project) => project.toDto(ProjectDto)),
      pagination,
    );
  }

  async findOneProject(id: string, userId?: string): Promise<ProjectDto> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['organization'],
    });

    if (!project) {
      throw new NotFoundException(this.i18nService.t('project.notFound'));
    }

    // Check access if userId is provided (for additional security)
    if (userId) {
      const hasAccess = await this.abacService.checkPermission({
        userId,
        resourceType: ResourceType.PROJECT,
        resourceId: id,
        action: ProjectAction.READ,
      });

      if (!hasAccess) {
        throw new ForbiddenException(
          this.i18nService.t('project.insufficientPermissions'),
        );
      }
    }

    return project.toDto(ProjectDto);
  }


  async createProject(
    dto: CreateProjectDto,
    userId: string,
  ): Promise<ProjectDto> {
    // Check if user has permission to create projects in this organization
    const hasOrgAccess = await this.abacService.checkPermission({
      userId,
      resourceType: ResourceType.ORGANIZATION,
      resourceId: dto.organizationId,
      action: OrganizationAction.MANAGE,
    });

    if (!hasOrgAccess) {
      throw new ForbiddenException(
        this.i18nService.t('organization.insufficientPermissions'),
      );
    }

    const project = this.projectRepository.create(dto);
    const savedProject = await this.projectRepository.save(project);

    await this.abacService.grantPermissions(userId, [
      {
        resourceType: ResourceType.PROJECT,
        resourceId: savedProject.id,
        actions: [
          ProjectAction.READ,
          ProjectAction.WRITE,
          ProjectAction.DELETE,
          ProjectAction.MANAGE,
        ],
      },
    ]);

    return savedProject.toDto(ProjectDto);
  }

  async updateProject(id: string, dto: UpdateProjectDto, userId?: string): Promise<ProjectDto> {
    const project = await this.projectRepository.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(this.i18nService.t('project.notFound'));
    }

    // Additional access check if userId is provided
    if (userId) {
      const hasAccess = await this.abacService.checkPermission({
        userId,
        resourceType: ResourceType.PROJECT,
        resourceId: id,
        action: ProjectAction.WRITE,
      });

      if (!hasAccess) {
        throw new ForbiddenException(
          this.i18nService.t('project.insufficientPermissions'),
        );
      }
    }

    Object.assign(project, dto);
    const updatedProject = await this.projectRepository.save(project);

    return updatedProject.toDto(ProjectDto);
  }

  async deleteProject(id: string, userId?: string): Promise<void> {
    const project = await this.projectRepository.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(this.i18nService.t('project.notFound'));
    }

    // Additional access check if userId is provided
    if (userId) {
      const hasAccess = await this.abacService.checkPermission({
        userId,
        resourceType: ResourceType.PROJECT,
        resourceId: id,
        action: ProjectAction.DELETE,
      });

      if (!hasAccess) {
        throw new ForbiddenException(
          this.i18nService.t('project.insufficientPermissions'),
        );
      }
    }

    await this.projectRepository.softDelete(id);
  }

}

import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { ProjectEntity } from '@/database/entities/project.entity';
import { ResourceType } from '@/database/entities/resource-attributes.entity';
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
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async findAllProjects(
    dto: QueryProjectsOffsetDto,
    userId: string,
  ): Promise<OffsetPaginatedDto<ProjectDto>> {
    if (dto.organizationId) {
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

  async findOneProject(id: string): Promise<ProjectDto> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['organization'],
    });

    if (!project) {
      throw new NotFoundException(this.i18nService.t('project.notFound'));
    }

    return project.toDto(ProjectDto);
  }

  async createProject(
    dto: CreateProjectDto,
    userId: string,
  ): Promise<ProjectDto> {
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

  async updateProject(id: string, dto: UpdateProjectDto): Promise<ProjectDto> {
    const project = await this.projectRepository.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(this.i18nService.t('project.notFound'));
    }

    Object.assign(project, dto);
    const updatedProject = await this.projectRepository.save(project);

    return updatedProject.toDto(ProjectDto);
  }

  async deleteProject(id: string): Promise<void> {
    const project = await this.projectRepository.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(this.i18nService.t('project.notFound'));
    }

    await this.projectRepository.softDelete(id);
  }
}

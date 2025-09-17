import { AuthGuard } from '@/auth/auth.guard';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Uuid } from '@/common/types/common.type';
import { ResourceType } from '@/database/entities/resource-attributes.entity';
import { CurrentUserSession } from '@/decorators/auth/current-user-session.decorator';
import { ApiAuth } from '@/decorators/http.decorators';
import { AbacGuard, RequireAbac } from '@/shared/abac/abac.guard';
import { ProjectAction } from '@/shared/abac/abac.types';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectDto, QueryProjectsOffsetDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@ApiTags('projects')
@Controller({
  path: 'projects',
  version: '1',
})
@UseGuards(AuthGuard, AbacGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiAuth({
    type: ProjectDto,
    summary: 'List projects.',
    isPaginated: true,
  })
  async findAllProjects(
    @Query() dto: QueryProjectsOffsetDto,
    @CurrentUserSession('user') user: CurrentUserSession['user'],
  ): Promise<OffsetPaginatedDto<ProjectDto>> {
    return await this.projectService.findAllProjects(dto, user.id);
  }

  @Get(':id')
  @RequireAbac({
    resourceType: ResourceType.PROJECT,
    action: ProjectAction.READ,
    resourceIdParam: 'id',
  })
  @ApiAuth({ summary: 'Find project by id', type: ProjectDto })
  @ApiParam({ name: 'id', type: 'string' })
  async findProject(@Param('id', ParseUUIDPipe) id: Uuid): Promise<ProjectDto> {
    return await this.projectService.findOneProject(id);
  }

  @Post()
  @ApiAuth({
    summary: 'Create a new project',
    type: ProjectDto,
  })
  async createProject(
    @Body() dto: CreateProjectDto,
    @CurrentUserSession('user') user: CurrentUserSession['user'],
  ): Promise<ProjectDto> {
    return await this.projectService.createProject(dto, user.id);
  }

  @Patch(':id')
  @RequireAbac({
    resourceType: ResourceType.PROJECT,
    action: ProjectAction.WRITE,
    resourceIdParam: 'id',
  })
  @ApiAuth({
    summary: 'Update project',
    type: ProjectDto,
  })
  @ApiParam({ name: 'id', type: 'string' })
  async updateProject(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @Body() dto: UpdateProjectDto,
  ): Promise<ProjectDto> {
    return await this.projectService.updateProject(id, dto);
  }

  @Delete(':id')
  @RequireAbac({
    resourceType: ResourceType.PROJECT,
    action: ProjectAction.DELETE,
    resourceIdParam: 'id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiAuth({
    summary: 'Delete a project',
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({ name: 'id', type: 'string' })
  async deleteProject(@Param('id', ParseUUIDPipe) id: Uuid): Promise<void> {
    return await this.projectService.deleteProject(id);
  }
}

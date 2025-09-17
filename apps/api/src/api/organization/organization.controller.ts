import { AuthGuard } from '@/auth/auth.guard';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Uuid } from '@/common/types/common.type';
import { ResourceType } from '@/database/entities/resource-attributes.entity';
import { CurrentUserSession } from '@/decorators/auth/current-user-session.decorator';
import { ApiAuth } from '@/decorators/http.decorators';
import { AbacGuard, RequireAbac } from '@/shared/abac/abac.guard';
import { OrganizationAction } from '@/shared/abac/abac.types';
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
import { OrganizationService } from './organization.service';

@ApiTags('organizations')
@Controller({
  path: 'organizations',
  version: '1',
})
@UseGuards(AuthGuard, AbacGuard)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  @RequireAbac({
    resourceType: ResourceType.ORGANIZATION,
    action: OrganizationAction.READ,
  })
  @ApiAuth({
    type: OrganizationDto,
    summary: 'List organizations.',
    isPaginated: true,
  })
  async findAllOrganizations(
    @Query() dto: QueryOrganizationsOffsetDto,
  ): Promise<OffsetPaginatedDto<OrganizationDto>> {
    return await this.organizationService.findAllOrganizations(dto);
  }

  @Get(':id')
  @RequireAbac({
    resourceType: ResourceType.ORGANIZATION,
    action: OrganizationAction.READ,
    resourceIdParam: 'id',
  })
  @ApiAuth({ summary: 'Find organization by id', type: OrganizationDto })
  @ApiParam({ name: 'id', type: 'string' })
  async findOrganization(
    @Param('id', ParseUUIDPipe) id: Uuid,
  ): Promise<OrganizationDto> {
    return await this.organizationService.findOneOrganization(id);
  }

  @Post()
  @RequireAbac({
    resourceType: ResourceType.ORGANIZATION,
    action: OrganizationAction.WRITE,
  })
  @ApiAuth({
    summary: 'Create a new organization',
    type: OrganizationDto,
  })
  async createOrganization(
    @Body() dto: CreateOrganizationDto,
    @CurrentUserSession('user') user: CurrentUserSession['user'],
  ): Promise<OrganizationDto> {
    return await this.organizationService.createOrganization(dto, user.id);
  }

  @Patch(':id')
  @RequireAbac({
    resourceType: ResourceType.ORGANIZATION,
    action: OrganizationAction.WRITE,
    resourceIdParam: 'id',
  })
  @ApiAuth({
    summary: 'Update organization',
    type: OrganizationDto,
  })
  @ApiParam({ name: 'id', type: 'string' })
  async updateOrganization(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @Body() dto: UpdateOrganizationDto,
    @CurrentUserSession('user') user: CurrentUserSession['user'],
  ): Promise<OrganizationDto> {
    return await this.organizationService.updateOrganization(id, dto, user.id);
  }

  @Delete(':id')
  @RequireAbac({
    resourceType: ResourceType.ORGANIZATION,
    action: OrganizationAction.DELETE,
    resourceIdParam: 'id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiAuth({
    summary: 'Delete an organization',
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({ name: 'id', type: 'string' })
  async deleteOrganization(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @CurrentUserSession('user') user: CurrentUserSession['user'],
  ): Promise<void> {
    return await this.organizationService.deleteOrganization(id, user.id);
  }

  @Get(':id/members')
  @RequireAbac({
    resourceType: ResourceType.ORGANIZATION,
    action: OrganizationAction.READ,
    resourceIdParam: 'id',
  })
  @ApiAuth({
    summary: 'Get organization members',
    type: OrganizationMemberDto,
    isPaginated: true,
  })
  @ApiParam({ name: 'id', type: 'string' })
  async getOrganizationMembers(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @CurrentUserSession('user') user: CurrentUserSession['user'],
  ): Promise<OrganizationMemberDto[]> {
    return await this.organizationService.getOrganizationMembers(id, user.id);
  }

  @Post(':id/members')
  @RequireAbac({
    resourceType: ResourceType.ORGANIZATION,
    action: OrganizationAction.INVITE,
    resourceIdParam: 'id',
  })
  @ApiAuth({
    summary: 'Add member to organization',
    type: OrganizationMemberDto,
  })
  @ApiParam({ name: 'id', type: 'string' })
  async addMember(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @Body() dto: AddMemberDto,
    @CurrentUserSession('user') user: CurrentUserSession['user'],
  ): Promise<OrganizationMemberDto> {
    return await this.organizationService.addMember(id, dto, user.id);
  }

  @Patch(':id/members/:memberId')
  @RequireAbac({
    resourceType: ResourceType.ORGANIZATION,
    action: OrganizationAction.MANAGE,
    resourceIdParam: 'id',
  })
  @ApiAuth({
    summary: 'Update member role',
    type: OrganizationMemberDto,
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'memberId', type: 'string' })
  async updateMemberRole(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @Param('memberId', ParseUUIDPipe) memberId: Uuid,
    @Body() dto: UpdateMemberRoleDto,
    @CurrentUserSession('user') user: CurrentUserSession['user'],
  ): Promise<OrganizationMemberDto> {
    return await this.organizationService.updateMemberRole(
      id,
      memberId,
      dto,
      user.id,
    );
  }

  @Delete(':id/members/:memberId')
  @RequireAbac({
    resourceType: ResourceType.ORGANIZATION,
    action: OrganizationAction.REMOVE_MEMBERS,
    resourceIdParam: 'id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiAuth({
    summary: 'Remove member from organization',
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'memberId', type: 'string' })
  async removeMember(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @Param('memberId', ParseUUIDPipe) memberId: Uuid,
    @CurrentUserSession('user') user: CurrentUserSession['user'],
  ): Promise<void> {
    return await this.organizationService.removeMember(id, memberId, user.id);
  }
}

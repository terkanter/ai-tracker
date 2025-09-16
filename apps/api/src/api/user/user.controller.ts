import { AuthGuard } from '@/auth/auth.guard';

import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Uuid } from '@/common/types/common.type';
import { CurrentUserSession } from '@/decorators/auth/current-user-session.decorator';
import { ApiAuth } from '@/decorators/http.decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { QueryUsersOffsetDto, UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiAuth({
    summary: 'Get current user',
    type: UserDto,
  })
  @Get('me')
  async getCurrentUser(
    @CurrentUserSession('user') user: CurrentUserSession['user'],
  ): Promise<UserDto> {
    return await this.userService.findOneUser(user.id);
  }

  @Get()
  @ApiAuth({
    type: UserDto,
    summary: 'List users.',
    isPaginated: true,
  })
  async findAllUsers(
    @Query() dto: QueryUsersOffsetDto,
  ): Promise<OffsetPaginatedDto<UserDto>> {
    return await this.userService.findAllUsers(dto);
  }

  @Get(':id')
  @ApiAuth({ summary: 'Find user by id', type: UserDto })
  @ApiParam({ name: 'id', type: 'string' })
  async findUser(@Param('id', ParseUUIDPipe) id: Uuid): Promise<UserDto> {
    return await this.userService.findOneUser(id);
  }

  @Delete(':id')
  @ApiAuth({
    summary: 'Delete a user',
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({ name: 'id', type: 'String' })
  deleteUser(@Param('id', ParseUUIDPipe) id: Uuid) {
    return this.userService.deleteUser(id);
  }

  @ApiAuth({
    summary: "Update user's profile",
    type: UserDto,
  })
  @Patch('me')
  updateUserProfile(
    @Body() dto: UpdateUserProfileDto,
    @CurrentUserSession() userSession: CurrentUserSession,
  ) {
    return this.userService.updateUserProfile(userSession.user.id, dto, {
      headers: userSession.headers,
    });
  }
}

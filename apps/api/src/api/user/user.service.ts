import { BetterAuthService } from '@/auth/better-auth.service';
import { UserEntity } from '@/auth/entities/user.entity';

import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { CurrentUserSession } from '@/decorators/auth/current-user-session.decorator';
import { I18nTranslations } from '@/generated/i18n.generated';

import { paginate } from '@/utils/pagination/offset-pagination';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { QueryUsersOffsetDto, UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly i18nService: I18nService<I18nTranslations>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly betterAuthService: BetterAuthService,
  ) {}

  async findAllUsers(
    dto: QueryUsersOffsetDto,
  ): Promise<OffsetPaginatedDto<UserDto>> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.createdAt', 'DESC');
    const [users, metaDto] = await paginate<UserEntity>(query, dto, {
      skipCount: false,
      takeAll: false,
    });
    return new OffsetPaginatedDto(users, metaDto);
  }

  async findOneUser(
    id: string,
    options?: FindOneOptions<UserEntity>,
  ): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id, ...(options?.where ?? {}) },
      ...(options ?? {}),
    });
    if (!user) {
      throw new NotFoundException(this.i18nService.t('user.notFound'));
    }
    return user;
  }

  async deleteUser(id: string) {
    await this.userRepository.findOneByOrFail({ id });
    await this.userRepository.softDelete(id);
    return HttpStatus.OK;
  }

  async getAllUsers(options?: FindManyOptions<UserEntity>) {
    return this.userRepository.find(options);
  }

  async updateUserProfile(
    userId: string,
    dto: UpdateUserProfileDto,
    options: { headers: CurrentUserSession['headers'] },
  ) {
    let shouldChangeUsername = !(dto.username == null);

    if (shouldChangeUsername) {
      const user = await this.findOneUser(userId, {
        select: { id: true, username: true },
      });
      shouldChangeUsername = user?.username !== dto.username;
    }

    await this.betterAuthService.api.updateUser({
      body: {
        ...(dto.image !== undefined ? { image: dto.image } : {}),
        ...(shouldChangeUsername ? { username: dto.username } : {}),
      },
      headers: options?.headers as any,
    });

    // Update rest of the fields manually
    await this.userRepository.update(userId, {
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
    return await this.findOneUser(userId);
  }
}

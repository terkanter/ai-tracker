import { PageOptionsDto as OffsetPageOptions } from '@/common/dto/offset-pagination/page-options.dto';
import {
  ClassField,
  StringField,
  StringFieldOptional,
} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
  @StringField()
  @Expose()
  id: string;

  @StringField()
  @Expose()
  username: string;

  @StringField()
  @Expose()
  email: string;

  @StringFieldOptional()
  @Expose()
  firstName?: string;

  @StringFieldOptional()
  @Expose()
  lastName?: string;

  @StringFieldOptional()
  @Expose()
  image?: string;

  @ClassField(() => Date)
  @Expose()
  createdAt: Date;

  @ClassField(() => Date)
  @Expose()
  updatedAt: Date;

  @Expose()
  @StringFieldOptional()
  bio?: string;
}

export class QueryUsersOffsetDto extends OffsetPageOptions {}

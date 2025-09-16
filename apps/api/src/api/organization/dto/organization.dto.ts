import { PageOptionsDto as OffsetPageOptions } from '@/common/dto/offset-pagination/page-options.dto';
import {
  ClassField,
  StringField,
  StringFieldOptional,
} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OrganizationDto {
  @StringField()
  @Expose()
  id: string;

  @StringField()
  @Expose()
  name: string;

  @StringFieldOptional()
  @Expose()
  description?: string;

  @ClassField(() => Date)
  @Expose()
  createdAt: Date;

  @ClassField(() => Date)
  @Expose()
  updatedAt: Date;
}

export class QueryOrganizationsOffsetDto extends OffsetPageOptions {}

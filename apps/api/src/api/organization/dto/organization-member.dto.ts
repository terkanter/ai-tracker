import { ClassField, StringField } from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

@Exclude()
export class OrganizationMemberDto {
  @StringField()
  @Expose()
  id: string;

  @StringField()
  @Expose()
  userId: string;

  @StringField()
  @Expose()
  organizationId: string;

  @ClassField(() => Date)
  @Expose()
  joinedAt?: Date;

  @ClassField(() => Date)
  @Expose()
  createdAt: Date;

  @ClassField(() => Date)
  @Expose()
  updatedAt: Date;
}

export class AddMemberDto {
  @IsUUID()
  userId: string;
}

export class UpdateMemberRoleDto {}

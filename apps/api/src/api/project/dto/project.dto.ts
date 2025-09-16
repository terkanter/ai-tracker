import { PageOptionsDto as OffsetPageOptions } from '@/common/dto/offset-pagination/page-options.dto';
import { ProjectStatus } from '@/database/entities/project.entity';
import {
  ClassField,
  StringField,
  StringFieldOptional,
} from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProjectDto {
  @StringField()
  @Expose()
  id: string;

  @StringField()
  @Expose()
  name: string;

  @StringField()
  @Expose()
  organizationId: string;

  @StringFieldOptional()
  @Expose()
  description?: string;

  @ApiProperty({ enum: ProjectStatus })
  @Expose()
  status: ProjectStatus;

  @ClassField(() => Date)
  @Expose()
  createdAt: Date;

  @ClassField(() => Date)
  @Expose()
  updatedAt: Date;
}

export class QueryProjectsOffsetDto extends OffsetPageOptions {
  @StringFieldOptional()
  organizationId?: string;

  @ApiProperty({ enum: ProjectStatus, required: false })
  status?: ProjectStatus;
}

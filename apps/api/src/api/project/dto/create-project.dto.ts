import { ProjectStatus } from '@/database/entities/project.entity';
import {
  StringField,
  StringFieldOptional,
} from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class CreateProjectDto {
  @StringField({ minLength: 1, maxLength: 255 })
  name: string;

  @IsUUID()
  organizationId: string;

  @StringFieldOptional({ maxLength: 1000 })
  description?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  @ApiProperty({ enum: ProjectStatus, required: false })
  status?: ProjectStatus;
}

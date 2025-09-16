import { ProjectStatus } from '@/database/models/project.model';
import { StringFieldOptional } from '@/decorators/field.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @StringFieldOptional({ minLength: 1, maxLength: 255 })
  name?: string;

  @StringFieldOptional({ maxLength: 1000 })
  description?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  @ApiProperty({ enum: ProjectStatus, required: false })
  status?: ProjectStatus;
}

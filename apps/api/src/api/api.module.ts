import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { HealthModule } from './health/health.module';
import { OrganizationModule } from './organization/organization.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    HealthModule,
    UserModule,
    FileModule,
    OrganizationModule,
    ProjectModule,
  ],
})
export class ApiModule {}

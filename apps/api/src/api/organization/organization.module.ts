import { OrganizationMemberModel } from '@/database/models/organization-member.model';
import { OrganizationModel } from '@/database/models/organization.model';
import { AbacModule } from '@/shared/abac/abac.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationModel, OrganizationMemberModel]),
    AbacModule,
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}

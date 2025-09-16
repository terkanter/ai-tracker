import { OrganizationMemberEntity } from '@/database/entities/organization-member.entity';
import { OrganizationEntity } from '@/database/entities/organization.entity';
import { AbacModule } from '@/shared/abac/abac.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationEntity, OrganizationMemberEntity]),
    AbacModule,
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}

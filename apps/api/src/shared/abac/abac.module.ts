import { PolicyEntity } from '@/database/entities/policy.entity';
import { ResourceAttributesEntity } from '@/database/entities/resource-attributes.entity';
import { UserAttributesEntity } from '@/database/entities/user-attributes.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbacService } from './abac.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PolicyEntity,
      UserAttributesEntity,
      ResourceAttributesEntity,
    ]),
  ],
  providers: [AbacService],
  exports: [AbacService],
})
export class AbacModule {}

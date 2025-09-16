import { PolicyModel } from '@/database/models/policy.model';
import { ResourceAttributesModel } from '@/database/models/resource-attributes.model';
import { UserAttributesModel } from '@/database/models/user-attributes.model';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbacService } from './abac.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PolicyModel,
      UserAttributesModel,
      ResourceAttributesModel,
    ]),
  ],
  providers: [AbacService],
  exports: [AbacService],
})
export class AbacModule {}

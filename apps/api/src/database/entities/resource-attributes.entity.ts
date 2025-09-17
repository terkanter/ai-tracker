import { Column, Entity, Index, Unique } from 'typeorm';
import { BaseModel } from './base.model';

export enum ResourceType {
  PROJECT = 1,
  ORGANIZATION = 2,
}

@Entity('resource_attributes')
@Unique(['resourceType', 'resourceId'])
@Index(['resourceType', 'resourceId'], { where: '"deletedAt" IS NULL' })
export class ResourceAttributesEntity extends BaseModel {
  @Index({ where: '"deletedAt" IS NULL' })
  @Column({ type: 'integer' })
  resourceType: ResourceType;

  @Index({ where: '"deletedAt" IS NULL' })
  @Column()
  resourceId: string;

  @Column({ type: 'jsonb', default: {} })
  attributes: Record<string, any>;
}

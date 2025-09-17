import { Column, Entity, Index, OneToMany, Unique } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('organizations')
export class OrganizationEntity extends BaseModel {
  @Index({ where: '"deletedAt" IS NULL' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany('OrganizationMemberEntity', 'organization')
  members: any[];

  @OneToMany('ProjectEntity', 'organization')
  projects: any[];
}

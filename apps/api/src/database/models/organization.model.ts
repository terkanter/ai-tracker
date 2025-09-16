import { Column, Entity, Index, OneToMany, Unique } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('organizations')
@Index(['name'], { where: '"deletedAt" IS NULL' })
export class OrganizationModel extends BaseModel {
  @Index({ where: '"deletedAt" IS NULL' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany('OrganizationMemberModel', 'organization')
  members: any[];

  @OneToMany('ProjectModel', 'organization')
  projects: any[];
}

import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from './base.model';
import { OrganizationModel } from './organization.model';

export enum ProjectStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}

@Entity('projects')
@Index(['name'], { where: '"deletedAt" IS NULL' })
@Index(['organizationId'], { where: '"deletedAt" IS NULL' })
@Index(['status'], { where: '"deletedAt" IS NULL' })
export class ProjectModel extends BaseModel {
  @Index({ where: '"deletedAt" IS NULL' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Index({ where: '"deletedAt" IS NULL' })
  @Column()
  organizationId: string;

  @ManyToOne(() => OrganizationModel, (organization) => organization.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationModel;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.ACTIVE,
  })
  status: ProjectStatus;
}

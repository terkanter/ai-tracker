import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from './base.model';
import { OrganizationEntity } from './organization.entity';

export enum ProjectStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}

@Entity('projects')
export class ProjectEntity extends BaseModel {
  @Index({ where: '"deletedAt" IS NULL' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Index({ where: '"deletedAt" IS NULL' })
  @Column()
  organizationId: string;

  @ManyToOne(
    () => OrganizationEntity,
    (organization) => organization.projects,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Index(['status'], { where: '"deletedAt" IS NULL' })
  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.ACTIVE,
  })
  status: ProjectStatus;
}

import { UserEntity } from '@/auth/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from './base.model';
import { OrganizationModel } from './organization.model';

@Entity('organization_members')
@Unique(['userId', 'organizationId'])
@Index(['userId'], { where: '"deletedAt" IS NULL' })
@Index(['organizationId'], { where: '"deletedAt" IS NULL' })
export class OrganizationMemberModel extends BaseModel {
  @Index({ where: '"deletedAt" IS NULL' })
  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Index({ where: '"deletedAt" IS NULL' })
  @Column()
  organizationId: string;

  @ManyToOne(() => OrganizationModel, (organization) => organization.members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationModel;

  @Column({ type: 'timestamp', nullable: true })
  joinedAt?: Date;
}

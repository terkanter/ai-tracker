import { UserEntity } from '@/auth/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from './base.model';
import { OrganizationEntity } from './organization.entity';

@Entity('organization_members')
@Unique(['userId', 'organizationId'])
export class OrganizationMemberEntity extends BaseModel {
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

  @ManyToOne(() => OrganizationEntity, (organization) => organization.members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;

  @Column({ type: 'timestamp', nullable: true })
  joinedAt?: Date;
}

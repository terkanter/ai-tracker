import { UserEntity } from '@/auth/entities/user.entity';
import { Column, Entity, Index, JoinColumn, OneToOne, Unique } from 'typeorm';
import { BaseModel } from './base.model';

@Entity('user_attributes')
@Unique(['userId'])
@Index(['userId'], { where: '"deletedAt" IS NULL' })
export class UserAttributesModel extends BaseModel {
  @Index({ where: '"deletedAt" IS NULL' })
  @Column()
  userId: string;

  @OneToOne(() => UserEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'jsonb', default: {} })
  attributes: Record<string, any>;
}

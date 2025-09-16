import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from './base.model';

export enum PolicyEffect {
  ALLOW = 'allow',
  DENY = 'deny',
}

@Entity('policies')
@Index(['effect', 'action'], { where: '"deletedAt" IS NULL' })
export class PolicyEntity extends BaseModel {
  @Index({ where: '"deletedAt" IS NULL' })
  @Column({
    type: 'enum',
    enum: PolicyEffect,
  })
  effect: PolicyEffect;

  @Index({ where: '"deletedAt" IS NULL' })
  @Column({ type: 'varchar', length: 100 })
  action: string;

  @Column({ type: 'jsonb' })
  condition: Record<string, any>;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'integer', default: 0 })
  priority: number;
}

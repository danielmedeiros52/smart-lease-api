import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('wallets')
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'float', default: 0 })
  balance: number;

  @Column({ type: 'varchar', length: 3 })
  currency: string;

  @OneToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

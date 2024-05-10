import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn, Relation,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { PropertyEntity } from '../../property/entities/property.entity';

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
  user: Relation<UserEntity>;

  @OneToOne(() => PropertyEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'property_id' })
  property: Relation<PropertyEntity>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  Relation,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserStatus } from '../enum/userStatus';
import {  WalletEntity } from '../../wallet/entities/wallet.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @Column({ name: 'phone', length: 30, nullable: true })
  phone: string;

  @Exclude()
  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @Column({ name: 'status', enum: UserStatus, nullable: false })
  status: UserStatus;

  @OneToOne(() => WalletEntity, (wallet) => wallet.user, { eager: false,nullable: true })
  wallet: Relation<WalletEntity>;
}

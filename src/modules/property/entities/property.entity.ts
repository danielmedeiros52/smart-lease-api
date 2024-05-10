import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { WalletEntity } from '../../wallet/entities/wallet.entity';

@Entity('properties')
export class PropertyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;
  @Column({ type: 'float' })
  price: number;
  @Column({ type: 'int', nullable: true })
  bedrooms: number;
  @Column({ type: 'int', nullable: true })
  bathrooms: number;
  @Column({ type: 'int' , nullable: true})
  size: number;
  @Column({ type: 'varchar', length: 255})
  address: string;
  @Column({ type: 'varchar', length: 255 })
  zipcode: string;
  @Column({ type: 'varchar', length: 255 })
  city: string;
  @Column({ type: 'varchar', length: 255 })
  country: string;
  @Column({ type: 'varchar', length: 255 })
  type: string;
  @Column({ type: 'varchar', length: 255 })
  receivePaymentOptions: string;
  @Column({ type: 'float' })
  reserveAmount: number;

  @ManyToOne(() => UserEntity, (user) => user.properties)
  @JoinColumn({ name: 'user_id' })
  owner: Relation<UserEntity>;

  @OneToOne(() => WalletEntity, (wallet) => wallet.user, {
    eager: false,
    nullable: true,
  })
  wallet: Relation<WalletEntity>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

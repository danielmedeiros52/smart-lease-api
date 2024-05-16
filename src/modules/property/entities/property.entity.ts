import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { WalletEntity } from '../../wallet/entities/wallet.entity';
import { PropertyStatus } from '../enum/propertyStatus';
import { OwnerEntity } from '../../../db/entity/owner.entity';
import { AddressEntity } from '../../../db/entity/address.entity';
import { TaxEntity } from '../../../db/entity/tax.entity';
import { MaintenanceEntity } from '../../../db/entity/maintenance.entity';

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
  @Column({ type: 'int', nullable: true })
  size: number;
  @Column({ type: 'varchar', length: 255 })
  propertyType: string;
  @Column({ type: 'varchar', length: 255 })
  paymentType: string;
  @Column({ type: 'float' })
  reserveValue: number;
  @Column({
    name: 'status',
    enum: PropertyStatus,
    nullable: false,
    default: PropertyStatus.AVAILABLE,
  })
  status: PropertyStatus;

  @ManyToOne(() => OwnerEntity, (owner) => owner.properties, { eager: true })
  @JoinColumn({ name: 'user_id' })
  owner: Relation<OwnerEntity>;

  @OneToOne(() => WalletEntity, (wallet) => wallet.user, {
    eager: false,
    nullable: true,
  })
  wallet: Relation<WalletEntity>;

  @ManyToOne(() => AddressEntity, (address) => address.properties,{ eager: true })
  @JoinColumn({ name: 'address_id' })
  address: Relation<AddressEntity>;

  @ManyToMany(() => TaxEntity)
  @JoinTable({ name: 'property_taxes' })
  taxes: Relation<TaxEntity[]>;

  @ManyToOne(() => MaintenanceEntity)
  @JoinTable({ name: 'property_maintenances' })
  maintenances: Relation<MaintenanceEntity[]>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

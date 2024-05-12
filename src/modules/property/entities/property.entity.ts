import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, JoinTable, ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { UserEntity } from '../../user/entities/user.entity';
import { WalletEntity } from '../../wallet/entities/wallet.entity';
import { UserStatus } from '../../user/enum/userStatus';
import { PropertyStatus } from '../enum/propertyStatus';
import { OwnerEntity } from "../../../db/entity/owner.entity";
import { AddressEntity } from "../../../db/entity/address.entity";
import { TaxEntity } from "../../../db/entity/tax.entity";
import { ProviderEntity } from "../../../db/entity/provider.entity";
import { MaintenanceEntity } from "../../../db/entity/maintenance.entity";

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

  @Column({ type: 'varchar', length: 255 })
  zipcode: string;
  @Column({ type: 'varchar', length: 255 })
  city: string;
  @Column({ type: 'varchar', length: 255 })
  country: string;
  @Column({ type: 'varchar', length: 255 })
  propertyType: string;
  @Column({ type: 'varchar', length: 255 })
  paymentType: string;
  @Column({ type: 'float' })
  reserveValue: number;
  @Column({ name: 'status', enum: PropertyStatus, nullable: false,default: PropertyStatus.AVAILABLE })
  status: UserStatus;

  @ManyToOne(() => OwnerEntity, (owner) => owner.properties)
  @JoinColumn({ name: 'user_id' })
  owner: Relation<OwnerEntity>;

  @OneToOne(() => WalletEntity, (wallet) => wallet.user, {
    eager: false,
    nullable: true,
  })
  wallet: Relation<WalletEntity>;

  @ManyToOne(() => AddressEntity, (address) => address.properties)
  @JoinColumn({ name: 'address_id' })
  address: Relation<AddressEntity>;

  @ManyToMany(() =>  TaxEntity)
  @JoinTable({name: 'property_taxes'})
  taxes: Relation<TaxEntity[]>;

  @ManyToOne(() =>  MaintenanceEntity)
  @JoinTable({name: 'property_maintenances'})
  maintenances: Relation<MaintenanceEntity[]>;



  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

}
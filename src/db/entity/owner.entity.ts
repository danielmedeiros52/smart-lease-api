import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { PropertyEntity } from '../../modules/property/entities/property.entity';
import { AddressEntity } from './address.entity';
import { ContractEntity } from './contract.entity';

@Entity({ name: 'owners' })
export class OwnerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>;

  @OneToMany(() => PropertyEntity, (property) => property.owner)
  properties: Relation<PropertyEntity[]>;

  @ManyToOne(() => AddressEntity, (address) => address.owners)
  @JoinColumn({ name: 'address_id' })
  address: Relation<OwnerEntity>;

  @OneToMany(() => ContractEntity, (contract) => contract.owner)
  contracts: Relation<ContractEntity[]>;
}

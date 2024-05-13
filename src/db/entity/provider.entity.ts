import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity({ name: 'providers' })
export class ProviderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AddressEntity, (address) => address.properties)
  @JoinColumn({ name: 'address_id' })
  address: Relation<AddressEntity>;
}

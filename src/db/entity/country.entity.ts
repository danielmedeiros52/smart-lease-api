import { Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity({ name: 'countries' })
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => AddressEntity, (address) => address.country)
  address: Relation<AddressEntity[]>;
}

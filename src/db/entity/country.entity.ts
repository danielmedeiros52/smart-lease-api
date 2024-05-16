import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity({ name: 'countries' })
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => AddressEntity, (address) => address.country)
  address: Relation<AddressEntity[]>;
}

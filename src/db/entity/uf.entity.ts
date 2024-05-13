import { Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity({ name: 'uf' })
export class UfEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => AddressEntity, (address) => address.uf)
  address: Relation<AddressEntity[]>;
}

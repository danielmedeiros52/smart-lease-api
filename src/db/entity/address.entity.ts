import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { PropertyEntity } from '../../modules/property/entities/property.entity';
import { OwnerEntity } from './owner.entity';
import { UfEntity } from './uf.entity';
import { CountryEntity } from './country.entity';

@Entity({ name: 'addresses' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column({ type: 'varchar', length: 255 })
  street: string;
  @Column({ type: 'varchar', length: 255 })
  complement: string;

  @Column({ type: 'varchar', length: 255 })
  zipcode: string;

  @OneToMany(() => OwnerEntity, (owner) => owner.address)
  owners: Relation<OwnerEntity[]>;

  @OneToMany(() => PropertyEntity, (property) => property.address)
  properties: Relation<PropertyEntity[]>;

  @OneToOne(() => UfEntity, { eager: true })
  @JoinColumn({ name: 'uf' })
  uf: Relation<UfEntity>;

  @OneToOne(() => CountryEntity, { eager: true })
  @JoinColumn({ name: 'country' })
  country: Relation<CountryEntity>;
}

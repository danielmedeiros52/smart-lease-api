import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AddressEntity } from './address.entity';

@Entity({ name: 'uf' })
export class UfEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  shorName: string;
  @Column({ type: 'varchar', length: 255 })
  neighborhood: string;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'varchar', length: 255 })
  city: string;
  @OneToMany(() => AddressEntity, (address) => address.uf)
  address: Relation<AddressEntity[]>;
}

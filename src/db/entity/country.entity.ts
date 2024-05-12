import {
  Entity, JoinColumn, OneToMany, OneToOne,
  PrimaryGeneratedColumn, Relation
} from "typeorm";
import { UserEntity } from "../../modules/user/entities/user.entity";
import { PropertyEntity } from "../../modules/property/entities/property.entity";
import { AddressEntity } from "./address.entity";

@Entity({ name: 'countries' })
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => AddressEntity, (address) => (address.country))
  address: Relation<AddressEntity[]>;
}

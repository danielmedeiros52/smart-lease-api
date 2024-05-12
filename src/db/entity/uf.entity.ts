import {
  Entity, JoinColumn, OneToMany, OneToOne,
  PrimaryGeneratedColumn, Relation
} from "typeorm";
import { UserEntity } from "../../modules/user/entities/user.entity";
import { PropertyEntity } from "../../modules/property/entities/property.entity";
import { AddressEntity } from "./address.entity";

@Entity({ name: 'uf' })
export class UfEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => AddressEntity, (address) => (address.uf))
  address: Relation<AddressEntity[]>;
}


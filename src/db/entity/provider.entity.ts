import {
  Entity, JoinColumn, ManyToOne, OneToOne,
  PrimaryGeneratedColumn, Relation
} from "typeorm";
import { UserEntity } from "../../modules/user/entities/user.entity";
import { AddressEntity } from "./address.entity";

@Entity({ name: 'providers' })
export class ProviderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AddressEntity, (address) => address.properties)
  @JoinColumn({ name: 'address_id' })
  address: Relation<AddressEntity>;
}

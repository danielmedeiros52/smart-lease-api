import {
  Entity, JoinColumn, OneToMany, OneToOne,
  PrimaryGeneratedColumn, Relation
} from "typeorm";
import { UserEntity } from "../../modules/user/entities/user.entity";
import { PropertyEntity } from "../../modules/property/entities/property.entity";
import { OwnerEntity } from "./owner.entity";
import { UfEntity } from "./uf.entity";
import { CountryEntity } from "./country.entity";

@Entity({ name: 'addresses' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @OneToMany(() => OwnerEntity, (owner) => (owner.address))
  owners: Relation<OwnerEntity[]>;

  @OneToMany(() => PropertyEntity, (property) => (property.address))
  properties: Relation<PropertyEntity[]>;

  @OneToOne(() => UfEntity, { eager: true})
  @JoinColumn({ name: 'uf' })
  uf: Relation<UfEntity>;

  @OneToOne(() => CountryEntity, { eager: true})
  @JoinColumn({ name: 'country' })
  country: Relation<CountryEntity>;
}

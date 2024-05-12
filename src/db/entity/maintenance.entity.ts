import {
  Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne,
  PrimaryGeneratedColumn, Relation
} from "typeorm";
import { UserEntity } from "../../modules/user/entities/user.entity";
import { AddressEntity } from "./address.entity";
import { ProviderEntity } from "./provider.entity";
import { PropertyEntity } from "../../modules/property/entities/property.entity";
import { ExpensesEntity } from "./expenses.entity";

@Entity({ name: 'maintenances' })
export class MaintenanceEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ProviderEntity)
  @JoinTable({ name: 'maintenance_providers' })
  address: Relation<ProviderEntity[]>;

  @ManyToOne(() => PropertyEntity, (property) => property.maintenances)
  @JoinColumn({ name: 'property_id' })
  properties: Relation<PropertyEntity>;

  @ManyToOne(() => ExpensesEntity, (expense) => expense.maintenances)
  @JoinColumn({ name: 'expense_id' })
  expense: Relation<ExpensesEntity>;
}

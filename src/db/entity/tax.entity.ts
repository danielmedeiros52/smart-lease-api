import {
  Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn, Relation
} from "typeorm";
import { UserEntity } from "../../modules/user/entities/user.entity";
import { PropertyEntity } from "../../modules/property/entities/property.entity";
import { OwnerEntity } from "./owner.entity";
import { UfEntity } from "./uf.entity";
import { CountryEntity } from "./country.entity";
import { ExpensesEntity } from "./expenses.entity";

@Entity({ name: 'taxes' })
export class TaxEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ExpensesEntity, (expense) => expense.maintenances)
  @JoinColumn({ name: 'expense_id' })
  expense: Relation<ExpensesEntity>;

}

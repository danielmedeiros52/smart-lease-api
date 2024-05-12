import {
  Entity, JoinColumn, ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn, Relation
} from "typeorm";
import { UserEntity } from "../../modules/user/entities/user.entity";
import { PropertyEntity } from "../../modules/property/entities/property.entity";
import { AddressEntity } from "./address.entity";
import { MaintenanceEntity } from "./maintenance.entity";
import { TaxEntity } from "./tax.entity";
import { ExpensesEntity } from "./expenses.entity";
import { WalletEntity } from "../../modules/wallet/entities/wallet.entity";
import { ContractEntity } from "./contract.entity";

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ContractEntity, (contract) => contract.transactions)
  @JoinColumn({ name: 'contract_id' })
  contract: Relation<ExpensesEntity>;

  @OneToOne(() => ExpensesEntity, (expense) => expense.transaction, {
    eager: false,
    nullable: true,
  })
  expense: Relation<ExpensesEntity>;
}


import {
  Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn, Relation
} from "typeorm";
import { UserEntity } from "../../modules/user/entities/user.entity";
import { PropertyEntity } from "../../modules/property/entities/property.entity";
import { AddressEntity } from "./address.entity";
import { MaintenanceEntity } from "./maintenance.entity";
import { TaxEntity } from "./tax.entity";
import { ExpensesEntity } from "./expenses.entity";
import { WalletEntity } from "../../modules/wallet/entities/wallet.entity";
import { TransactionEntity } from "./transaction.entity";
import { TenantEntity } from "./tenant.entity";
import { ProviderEntity } from "./provider.entity";

@Entity({ name: 'contracts' })
export class ContractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => TransactionEntity, (transaction) => (transaction.contract))
  transactions: Relation<TransactionEntity[]>;

  @OneToOne(() => ExpensesEntity, (expense) => expense.transaction, {
    eager: false,
    nullable: true,
  })
  expense: Relation<ExpensesEntity>;

  @ManyToMany(() => TenantEntity, (tenant) => tenant.contracts)
  @JoinTable({ name: 'tenant_contract' })
  tenants: Relation<TenantEntity[]>;
  
}


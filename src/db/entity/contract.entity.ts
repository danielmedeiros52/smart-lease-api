import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { ExpensesEntity } from './expenses.entity';
import { TransactionEntity } from './transaction.entity';
import { TenantEntity } from './tenant.entity';
import { OwnerEntity } from './owner.entity';

@Entity({ name: 'contracts' })
export class ContractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.contract)
  transactions: Relation<TransactionEntity[]>;

  @OneToOne(() => ExpensesEntity, (expense) => expense.transaction, {
    eager: false,
    nullable: true,
  })
  expense: Relation<ExpensesEntity>;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.contracts)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Relation<TenantEntity>;

  @ManyToOne(() => OwnerEntity, (owner) => owner.contracts)
  @JoinColumn({ name: 'owner_id' })
  owner: Relation<OwnerEntity>;
}

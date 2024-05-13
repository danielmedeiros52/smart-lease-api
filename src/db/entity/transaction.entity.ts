import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { ExpensesEntity } from './expenses.entity';
import { ContractEntity } from './contract.entity';

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

import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { ExpensesEntity } from './expenses.entity';

@Entity({ name: 'taxes' })
export class TaxEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ExpensesEntity, (expense) => expense.maintenances)
  @JoinColumn({ name: 'expense_id' })
  expense: Relation<ExpensesEntity>;
}

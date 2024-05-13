import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { MaintenanceEntity } from './maintenance.entity';
import { TaxEntity } from './tax.entity';
import { TransactionEntity } from './transaction.entity';

@Entity({ name: 'expenses' })
export class ExpensesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => MaintenanceEntity, (maintenance) => maintenance.expense)
  maintenances: Relation<MaintenanceEntity[]>;

  @OneToMany(() => TaxEntity, (tax) => tax.expense)
  taxes: Relation<TaxEntity[]>;

  @OneToOne(() => TransactionEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'transaction_id' })
  transaction: Relation<TransactionEntity>;
}

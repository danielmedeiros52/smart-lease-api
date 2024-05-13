import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { ContractEntity } from './contract.entity';

@Entity({ name: 'tenants' })
export class TenantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>;

  @OneToMany(() => ContractEntity, (contract) => contract.tenant)
  contracts: Relation<ContractEntity[]>;
}

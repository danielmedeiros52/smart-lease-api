import {
  Entity, JoinColumn, JoinTable, ManyToMany, OneToOne,
  PrimaryGeneratedColumn, Relation
} from "typeorm";
import { UserEntity } from "../../modules/user/entities/user.entity";
import { ContractEntity } from "./contract.entity";

@Entity({ name: 'tenants' })
export class TenantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>;

  @ManyToMany(() => ContractEntity, (contract) => contract.tenants)
  @JoinTable({ name: 'tenant_contract' })
  contracts: Relation<ContractEntity[]>;
}

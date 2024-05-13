import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'access_group' })
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

}

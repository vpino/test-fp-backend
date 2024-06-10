import { Name } from 'src/modules/name/entities/name.entity';
import { UserRisk } from 'src/modules/user-risk/entities/user-risk.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ConsumerIdentity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Name, name => name.consumerIdentity)
  names: Name[];

  @ManyToOne(() => UserRisk, userRisk => userRisk.consumerIdentity, { nullable: true})
  userRisk: UserRisk;

  @Column({ type: 'boolean', default: true,  nullable: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false,  nullable: true })
  isDeleted: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true
  })
  updatedAt?: Date;
}

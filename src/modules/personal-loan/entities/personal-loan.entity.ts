import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { StatusPersonalLoan } from '../enums/personal-loan.enum';
import { Customer } from 'src/modules/customer/entities/customer.entity';

@Entity()
export class PersonalLoan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, (customer) => customer.personalLoans)
  customer: Customer;

  @Column({ nullable: true })
  monthlyIncome: string;

  @Column({ nullable: true })
  monthlyBills: string;

  @Column({ type: 'numeric', nullable: true })
  amount: number;

  @Column({ nullable: true })
  duration: string;

  @Column('text', { array: true, nullable: true })
  assets: string[];

  @Column({ type: 'numeric', nullable: true })
  assetsAmount: number;

  @Column({ type: 'boolean', nullable: true })
  tc: boolean;

  @Column({
    type: 'enum',
    enum: StatusPersonalLoan,
    default: StatusPersonalLoan.MOUNTHLY_BUDGET,
    nullable: true,
  })
  status: StatusPersonalLoan;

  @Column({ type: 'boolean', default: true, nullable: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false, nullable: true })
  isDeleted: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt?: Date;
}

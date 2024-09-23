import { Customer } from 'src/modules/customer/entities/customer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { StatusHomeLoan } from '../enums/home-loan.enum';

@Entity()
export class HomeLoan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, (customer) => customer.homeLoans)
  customer: Customer;

  @Column({ nullable: true })
  propertyUsage: string;

  @Column({ nullable: true })
  typeHome: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  town: string;

  @Column({ type: 'numeric', nullable: true })
  priceHome: number;

  @Column({ type: 'numeric', nullable: true })
  paymentInitial: string;

  @Column({ nullable: true })
  percentageInitial: string;

  @Column({ type: 'numeric', nullable: true })
  monthlyIncome: number;

  @Column({ type: 'numeric', nullable: true })
  monthlyDebt: number;

  @Column('text', { array: true, nullable: true })
  assets: string[];

  @Column({ type: 'numeric', nullable: true })
  assetsAmount: number;

  @Column({ type: 'boolean', nullable: true })
  tc: boolean;

  @Column({
    type: 'enum',
    enum: StatusHomeLoan,
    default: StatusHomeLoan.PROPERTY_USAGE,
    nullable: true,
  })
  status: StatusHomeLoan;

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

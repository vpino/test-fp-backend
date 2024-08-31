import { StatusKyc } from 'src/common/enums/customer.enums';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { StatusOnboarding } from '../enums/individual-customer.enum';

@Entity()
export class IndividualCustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Customer, (customer) => customer.id, { nullable: true })
  @JoinColumn({ name: 'customerId' })
  customerId: Customer;

  @Column({ type: 'varchar', length: 100, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  middleName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lastName: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  zipCode: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  dni: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  addressExtension: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  typeDocument: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  town: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  housingType: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  housingYear: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  housingMonth: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  educationLevel: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  educationArea: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  educationYear: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  occupation: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  typeBusiness: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  companyName: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  companyPhone: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  companyAddress: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  companyState: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  companyCity: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  companyTown: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  companyYear: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  companyMonth: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: StatusKyc,
    default: StatusKyc.CREATED,
    nullable: true,
  })
  statusKyc: StatusKyc;

  @Column({
    type: 'enum',
    enum: StatusOnboarding,
    default: StatusOnboarding.LOAD_NAMES,
    nullable: true,
  })
  status: StatusOnboarding;

  @Column({ nullable: true, default: null })
  verificationSessionId: string;

  @Column('text', { array: true, nullable: true })
  verificationSessions: string[];

  @Column({ type: 'boolean', nullable: true, default: false })
  manualValidation: boolean;

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

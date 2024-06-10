import { StatusKyc } from 'src/common/enums/customer.enums';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class IndividualCustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Customer, customer => customer.id, { nullable: true })
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

  @Column({ type: 'enum', enum: StatusKyc, default: StatusKyc.CREATED, nullable: true })
  statusKyc: StatusKyc;

  @Column({ nullable: true, default: null })
  verificationSessionId: string;

  @Column('text', { array: true, nullable: true })
  verificationSessions: string[];

  @Column({ type: 'boolean', nullable: true, default: false })
  manualValidation: boolean;

  @Column({ type: 'boolean', default: true, nullable: true})
  isActive: boolean;

  @Column({ type: 'boolean', default: false, nullable: true })
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
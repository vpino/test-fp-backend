import { IsEmail } from 'class-validator';
import { TypeCustomer } from 'src/common/enums/customer.enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PersonalLoan } from 'src/modules/personal-loan/entities/personal-loan.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  @IsEmail()
  email: string;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: TypeCustomer, nullable: true })
  type: TypeCustomer;

  @Column({ nullable: true })
  password: string;

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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @OneToMany(() => PersonalLoan, (personalLoan) => personalLoan.customer)
  personalLoans: PersonalLoan[];
}

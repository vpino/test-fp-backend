import { ClientTags } from 'src/modules/client-tags/entities/client-tags.entity';
import { CreditInformation } from 'src/modules/credit-information/entities/credit-information.entity';
import { EducationInformation } from 'src/modules/education-information/entities/education-information.entity';
import { FinancialInformation } from 'src/modules/financial-information/entities/financial-information.entity';
import { LegalInformation } from 'src/modules/legal-information/entities/legal-information.entity';
import { LoanInformation } from 'src/modules/loan-information/entities/loan-information.entity';
import { MortgageInformation } from 'src/modules/mortgage-information/entities/mortgage-information.entity';
import { Persona } from 'src/modules/persona/entities/persona.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { array: true, nullable: true })
  productTypes: string[];

  @OneToOne(() => Persona, { nullable: true, eager: true })
  @JoinColumn({ name: 'persona' })
  personalInformation: Persona;

  @OneToOne(() => LoanInformation, { nullable: true, eager: true })
  @JoinColumn({ name: 'loanInformation' })
  loanInformation: LoanInformation;

  @OneToOne(() => MortgageInformation, { nullable: true, eager: true })
  @JoinColumn({ name: 'mortgageInformation' })
  mortgageInformation: MortgageInformation;

  @OneToOne(() => CreditInformation, { nullable: true, eager: true })
  @JoinColumn({ name: 'creditInformation' })
  creditInformation: CreditInformation;

  @OneToOne(() => FinancialInformation, { nullable: true, eager: true })
  @JoinColumn({ name: 'financialInformation' })
  financialInformation: FinancialInformation;

  @OneToOne(() => EducationInformation, { nullable: true, eager: true })
  @JoinColumn({ name: 'educationInformation' })
  educationInformation: EducationInformation;

  @OneToOne(() => LegalInformation, { nullable: true, eager: true })
  @JoinColumn({ name: 'legalInformation' })
  legalInformation: LegalInformation;

  @OneToOne(() => ClientTags, { nullable: true, eager: true })
  @JoinColumn({ name: 'clientTags' })
  clientTags: ClientTags;

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

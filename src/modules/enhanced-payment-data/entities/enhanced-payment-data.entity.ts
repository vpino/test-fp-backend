import { Tradeline } from 'src/modules/tradeline/entities/tradeline.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class EnhancedPaymentData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tradeline, (tradeline) => tradeline.enhancedPaymentData)
  tradeline: Tradeline;

  @Column({ nullable: true })
  enhancedAccountCondition: string;

  @Column({ nullable: true })
  enhancedAccountType: string;

  @Column({ nullable: true })
  enhancedPaymentHistory84: string;

  @Column({ nullable: true })
  enhancedPaymentStatus: string;

  @Column({ nullable: true })
  enhancedSpecialComment: string;

  @Column({ nullable: true })
  enhancedTerms: string;

  @Column({ nullable: true })
  enhancedTermsFrequency: string;

  @Column({ nullable: true })
  originalLoanAmount: string;

  @Column({ nullable: true })
  paymentLevelDate: string;

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

import { EnhancedPaymentData } from 'src/modules/enhanced-payment-data/entities/enhanced-payment-data.entity';
import { UserRisk } from 'src/modules/user-risk/entities/user-risk.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Tradeline {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  accountNumber: string;

  @Column({ nullable: true })
  accountType: string;

  @Column({ nullable: true })
  amount1: string;

  @Column({ nullable: true })
  amount1Qualifier: string;

  @Column({ nullable: true })
  balanceDate: string;

  @Column({ nullable: true })
  delinquencies30Days: string;

  @Column({ nullable: true })
  delinquencies60Days: string;

  @Column({ nullable: true })
  delinquencies90to180Days: string;

  @Column({ nullable: true })
  derogCounter: string;

  @Column({ nullable: true })
  ecoa: string;

  @OneToMany(() => EnhancedPaymentData, enhancedPaymentData => enhancedPaymentData.tradeline, { nullable: true})
  enhancedPaymentData: EnhancedPaymentData[];

  @Column({ nullable: true })
  evaluation: string;

  @Column({ nullable: true })
  kob: string;

  @Column({ nullable: true })
  monthsHistory: string;

  @Column({ nullable: true })
  openDate: string;

  @Column({ nullable: true })
  openOrClosed: string;

  @Column({ nullable: true })
  paymentHistory: string;

  @Column({ nullable: true })
  revolvingOrInstallment: string;

  @Column({ nullable: true })
  specialComment: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  statusDate: string;

  @Column({ nullable: true })
  subscriberCode: string;

  @Column({ nullable: true })
  subscriberName: string;

  @Column({ nullable: true })
  terms: string;

  @ManyToOne(() => UserRisk, userRisk => userRisk.tradeline)
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

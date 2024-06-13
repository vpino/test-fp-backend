import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class AmortizationSettings {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  amortizationProfile: string;

  @Column({ nullable: true })
  encodedKey: string;

  @Column({ nullable: true })
  feeAmortizationUponRescheduleRefinanceOption: string;

  @Column({ nullable: true })
  frequency: string;

  @Column({ type: 'numeric', nullable: true })
  intervalCount: number;

  @Column({ nullable: true })
  intervalType: string;

  @Column({ type: 'numeric', nullable: true })
  periodCount: number;

  @Column({ nullable: true })
  periodUnit: string;

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

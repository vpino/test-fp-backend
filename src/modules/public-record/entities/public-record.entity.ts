import { UserRisk } from 'src/modules/user-risk/entities/user-risk.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class PublicRecord {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  courtCode: string;

  @Column({ nullable: true })
  courtName: string;

  @Column({ nullable: true })
  ecoa: string;

  @Column({ nullable: true })
  evaluation: string;

  @Column({ nullable: true })
  filingDate: string;

  @Column({ nullable: true })
  referenceNumber: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  statusDate: string;

  @ManyToOne(() => UserRisk, userRisk => userRisk.publicRecord, { nullable: true})
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

import { UserRisk } from 'src/modules/user-risk/entities/user-risk.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Inquiry {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  subscriberCode: string;

  @Column({ nullable: true })
  subscriberName: string;

  @Column({ nullable: true })
  terms: string;

  @Column({ nullable: true })
  type: string;

  @ManyToOne(() => UserRisk, userRisk => userRisk.inquiry, { nullable: true})
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

import { UserRisk } from 'src/modules/user-risk/entities/user-risk.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class EmploymentInformation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstReportedDate: string;

  @Column({ nullable: true })
  lastUpdatedDate: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  source: string;

  @ManyToOne(() => UserRisk, (userRisk) => userRisk.employmentInformation, {
    nullable: true,
  })
  userRisk: UserRisk;

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

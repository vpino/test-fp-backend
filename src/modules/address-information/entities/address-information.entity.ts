import { UserRisk } from 'src/modules/user-risk/entities/user-risk.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class AddressInformation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  dwellingType: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstReportedDate: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastReportingSubscriberCode: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastUpdatedDate: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  source: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  streetName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  streetPrefix: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  streetSuffix: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  timesReported: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unitId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unitType: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  zipCode: string;

  @ManyToOne(() => UserRisk, (userRisk) => userRisk.addressInformation, {
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

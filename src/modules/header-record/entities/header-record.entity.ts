import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class HeaderRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  reportDate: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  reportTime: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  preamble: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  versionNo: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  mKeywordLength: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  mKeywordText: string;

  @Column({ type: 'varchar', length: 8, nullable: true })
  y2kReportedDate: string;

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

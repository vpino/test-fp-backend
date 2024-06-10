import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class LegalInformation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  consentsToFcra: boolean;

  @Column({ type: 'boolean', default: false, nullable: true })
  consentsToTcpa: boolean;

  @Column({ type: 'varchar', nullable: true })
  tcpaLanguage: string;

  @Column({ type: 'varchar', nullable: true })
  fcraLanguage: string;

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

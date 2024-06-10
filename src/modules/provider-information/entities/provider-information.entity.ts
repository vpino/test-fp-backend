import { UserRisk } from 'src/modules/user-risk/entities/user-risk.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class ProviderInformation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  subscriberCode: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  subscriberName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  terms: string;

  @ManyToOne(() => UserRisk, userRisk => userRisk.providerInformation, { nullable: true})
  userRisk: UserRisk;

  @Column({ type: 'boolean', default: true,  nullable: true})
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

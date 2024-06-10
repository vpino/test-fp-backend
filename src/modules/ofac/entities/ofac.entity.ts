import { UserRisk } from 'src/modules/user-risk/entities/user-risk.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Ofac {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  messageNumber: string;

  @Column({ nullable: true })
  messageText: string;

  @ManyToOne(() => UserRisk, userRisk => userRisk.ofac, { nullable: true})
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

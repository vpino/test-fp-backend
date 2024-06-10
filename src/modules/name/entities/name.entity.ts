import { ConsumerIdentity } from 'src/modules/consumer-identity/entities/consumer-identity.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Name {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => ConsumerIdentity,
    (consumerIdentity) => consumerIdentity.names,
  )
  consumerIdentity: ConsumerIdentity;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ nullable: true })
  type: string;

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

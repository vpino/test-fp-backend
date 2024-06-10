import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class ClientTags {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { array: true, nullable: true })
  subId: string[];

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

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Country } from './country.entity';
import { Township } from './township.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  _id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @ManyToOne(() => Country, country => country.states, { nullable: true })
  country: Country;

  @OneToMany(() => Township, township => township.state, { nullable: true })
  townships: Township[];

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

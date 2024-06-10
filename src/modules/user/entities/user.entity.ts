import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, Index, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserStatusEnum } from '../../../common/enums/user.enum';
import { SALT_ROUNDS } from '../settings/password';
import { Persona } from 'src/modules/persona/entities/persona.entity';

@Entity()
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.NOT_VERIFIED,
    nullable: true
  })
  status: UserStatusEnum;

  @ManyToOne(() => Persona, persona => persona.users, { eager: true })
  @JoinColumn({ name: 'personaId' })
  persona: Persona;

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  }

  @BeforeInsert()
  normalizeEmail() {
    this.email = this.email.toLocaleLowerCase();
  }
}

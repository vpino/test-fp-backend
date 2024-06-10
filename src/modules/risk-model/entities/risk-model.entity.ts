import { ScoreFactors } from 'src/modules/score-factors/entities/score-factors.entity';
import { UserRisk } from 'src/modules/user-risk/entities/user-risk.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class RiskModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  evaluation: string;

  @Column({ nullable: true })
  modelIndicator: string;

  @Column({ nullable: true })
  score: string;

  @OneToMany(() => ScoreFactors, scoreFactors => scoreFactors.riskModel, { nullable: true})
  scoreFactors: ScoreFactors[];

  @ManyToOne(() => UserRisk, userRisk => userRisk.riskModel)
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

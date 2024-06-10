import { AddressInformation } from 'src/modules/address-information/entities/address-information.entity';
import { ConsumerIdentity } from 'src/modules/consumer-identity/entities/consumer-identity.entity';
import { EmploymentInformation } from 'src/modules/employment-information/entities/employment-information.entity';
import { EndTotals } from 'src/modules/end-totals/entities/end-totals.entity';
import { InformationalMessage } from 'src/modules/informational-message/entities/informational-message.entity';
import { Inquiry } from 'src/modules/inquiry/entities/inquiry.entity';
import { Ofac } from 'src/modules/ofac/entities/ofac.entity';
import { ProviderInformation } from 'src/modules/provider-information/entities/provider-information.entity';
import { PublicRecord } from 'src/modules/public-record/entities/public-record.entity';
import { RiskModel } from 'src/modules/risk-model/entities/risk-model.entity';
import { Tradeline } from 'src/modules/tradeline/entities/tradeline.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class UserRisk {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  modelID: string;

  @Column({ nullable: true })
  decision: string;

  @Column({ nullable: true })
  woe: string;

  @Column({ nullable: true })
  woeDescription: string;

  @Column({ nullable: true })
  riskID: string;

  @Column({ nullable: true })
  riskTier: string;

  @OneToMany(() => ProviderInformation, provider => provider.userRisk, { nullable: true})
  providerInformation: ProviderInformation[];

  @OneToMany(() => AddressInformation, address => address.userRisk, { nullable: true})
  addressInformation: AddressInformation[];

  @OneToMany(() => ConsumerIdentity, consumer => consumer.userRisk, { nullable: true})
  consumerIdentity: ConsumerIdentity[];

  @OneToMany(() => EmploymentInformation, employment => employment.userRisk, { nullable: true})
  employmentInformation: EmploymentInformation[];

  @OneToMany(() => InformationalMessage, message => message.userRisk, { nullable: true})
  informationalMessage: InformationalMessage[];

  @OneToMany(() => Inquiry, inquiry => inquiry.userRisk)
  inquiry: Inquiry[];

  @OneToMany(() => Ofac, ofac => ofac.userRisk, { nullable: true})
  ofac: Ofac[];

  @OneToMany(() => PublicRecord, record => record.userRisk, { nullable: true})
  publicRecord: PublicRecord[];

  @OneToMany(() => RiskModel, model => model.userRisk, { nullable: true})
  riskModel: RiskModel[];

  @OneToMany(() => Tradeline, tradeline => tradeline.userRisk, { nullable: true})
  tradeline: Tradeline[];

  @OneToMany(() => EndTotals, totals => totals.userRisk, { nullable: true})
  endTotals: EndTotals[];

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

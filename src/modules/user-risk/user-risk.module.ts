
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRisk } from './entities/user-risk.entity';
import { UserRiskService } from './user-risk.service';
import { UserRiskController } from './user-risk.controller';
import { HeaderRecordModule } from '../header-record/header-record.module';
import { AddressInformationModule } from '../address-information/address-information.module';
import { ConsumerIdentityModule } from '../consumer-identity/consumer-identity.module';
import { EmploymentInformationModule } from '../employment-information/employment-information.module';
import { InformationalMessageModule } from '../informational-message/informational-message.module';
import { InquiryModule } from '../inquiry/inquiry.module';
import { OfacModule } from '../ofac/ofac.module';
import { PublicRecordModule } from '../public-record/public-record.module';
import { RiskModelModule } from '../risk-model/risk-model.module';
import { TradelineModule } from '../tradeline/tradeline.module';
import { EndTotalsModule } from '../end-totals/end-totals.module';
import { NameModule } from '../name/name.module';
import { EnhancedPaymentDataModule } from '../enhanced-payment-data/enhanced-payment-data.module';
import { ProviderInformationModule } from '../provider-information/provider-information.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRisk]),
    ProviderInformationModule,
    HeaderRecordModule,
    AddressInformationModule,
    ConsumerIdentityModule,
    NameModule,
    EmploymentInformationModule,
    InformationalMessageModule,
    InquiryModule,
    OfacModule,
    PublicRecordModule,
    RiskModelModule,
    EnhancedPaymentDataModule,
    TradelineModule,
    EndTotalsModule
  ],
  controllers: [UserRiskController],
  providers: [UserRiskService],
  exports: [UserRiskService],
})
export class UserRiskModule {}

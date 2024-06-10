import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import serverConfig from './config/server.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import throttlerConfig from './config/throttler.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PersonaModule } from './modules/persona/persona.module';
import { MasterTablesModule } from './modules/master-tables/master-tables.module';
import mailgunConfig from './config/mailgun.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanInformationModule } from './modules/loan-information/loan-information.module';
import { MortgageInformationModule } from './modules/mortgage-information/mortgage-information.module';
import { CreditInformationModule } from './modules/credit-information/credit-information.module';
import { FinancialInformationModule } from './modules/financial-information/financial-information.module';
import { EducationInformationModule } from './modules/education-information/education-information.module';
import { LegalInformationModule } from './modules/legal-information/legal-information.module';
import { ClientTagsModule } from './modules/client-tags/client-tags.module';
import { LoanModule } from './modules/loan/loan.module';
import { CustomerModule } from './modules/customer/customer.module';
import { IndividualCustomerModule } from './modules/individual-customer/individual-customer.module';
import { EmploymentInformationModule } from './modules/employment-information/employment-information.module';
import { EndTotalsModule } from './modules/end-totals/end-totals.module';
import { EnhancedPaymentDataModule } from './modules/enhanced-payment-data/enhanced-payment-data.module';
import { HeaderRecordModule } from './modules/header-record/header-record.module';
import { InformationalMessageModule } from './modules/informational-message/informational-message.module';
import { InquiryModule } from './modules/inquiry/inquiry.module';
import { NameModule } from './modules/name/name.module';
import { OfacModule } from './modules/ofac/ofac.module';
import { ProviderInformationModule } from './modules/provider-information/provider-information.module';
import { PublicRecordModule } from './modules/public-record/public-record.module';
import { RiskModelModule } from './modules/risk-model/risk-model.module';
import { ScoreFactorsModule } from './modules/score-factors/score-factors.module';
import { TradelineModule } from './modules/tradeline/tradeline.module';
import { UserRiskModule } from './modules/user-risk/user-risk.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/.${process.env.NODE_ENV}.env`,
      load: [
        serverConfig,
        databaseConfig,
        jwtConfig,
        throttlerConfig,
        mailgunConfig,
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.userName'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [
          __dirname + '/modules/**/entities/*.entity{.ts,.js}',
          __dirname + '/common/entities/*.entity{.ts,.js}',
        ],
        synchronize: configService.get('database.synchronize'),
        logging: ['error', 'query'],
      }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ThrottlerModuleOptions => ({
        throttlers: [
          {
            name: configService.get('throttler.name'),
            ttl: configService.get('throttler.ttl'),
            limit: configService.get('throttler.limit'),
          },
        ],
      }),
    }),
    CommonModule,
    UserModule,
    AuthModule,
    PersonaModule,
    MasterTablesModule,
    CustomerModule,
    IndividualCustomerModule,
    LoanInformationModule,
    MortgageInformationModule,
    CreditInformationModule,
    FinancialInformationModule,
    EducationInformationModule,
    LegalInformationModule,
    ClientTagsModule,
    LoanModule,
    ClientTagsModule,
    EmploymentInformationModule,
    EndTotalsModule,
    EnhancedPaymentDataModule,
    HeaderRecordModule,
    InformationalMessageModule,
    InquiryModule,
    NameModule,
    OfacModule,
    ProviderInformationModule,
    PublicRecordModule,
    RiskModelModule,
    ScoreFactorsModule,
    TradelineModule,
    UserRiskModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equifax } from './entities/equifax.entity';
import { EquifaxService } from './equifax.service';
import { EquifaxController } from './equifax.controller';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { AssetViewService } from './services/asset-view.service';
import { BankTransactionDataService } from './services/bank-transaction-data.service';
import { ChexAdvisorService } from './services/chex-advisor.service';
import { OneViewService } from './services/one-view.service';
import { PreApprovalOneService } from './services/pre-approval-one.service';
import { PreQualificationService } from './services/pre-qualification.service';
import { PreScreenService } from './services/pre-screen.service';
import { ScoreAttributesService } from './services/score-attributes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Equifax])],
  controllers: [EquifaxController],
  providers: [
    EquifaxService,
    AxiosAdapter,
    AssetViewService,
    BankTransactionDataService,
    ChexAdvisorService,
    OneViewService,
    PreApprovalOneService,
    PreQualificationService,
    PreScreenService,
    ScoreAttributesService,
  ],
  exports: [
    EquifaxService,
    AssetViewService,
    BankTransactionDataService,
    ChexAdvisorService,
    OneViewService,
    PreApprovalOneService,
    PreQualificationService,
    PreScreenService,
    ScoreAttributesService,
  ],
})
export class EquifaxModule {}

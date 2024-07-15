import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Experian } from './entities/experian.entity';
import { ExperianController } from './experian.controller';
import { OpenBankingService } from './services/open-banking.service';
import { TransactionCategoriserService } from './services/transaction-categoriser.service';
import { ExperianService } from './experian.service';

@Module({
  imports: [TypeOrmModule.forFeature([Experian])],
  controllers: [ExperianController],
  providers: [
    ExperianService,
    AxiosAdapter,
    OpenBankingService,
    TransactionCategoriserService
  ],
  exports: [
    ExperianService,
    OpenBankingService,
    TransactionCategoriserService
  ],
})
export class ExperianModule {}

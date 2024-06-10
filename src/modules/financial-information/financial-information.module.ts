import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialInformationService } from './financial-information.service';
import { FinancialInformationController } from './financial-information.controller';
import { FinancialInformation } from './entities/financial-information.entity';

@Module({
  providers: [FinancialInformationService],
  controllers: [FinancialInformationController],
  imports: [TypeOrmModule.forFeature([FinancialInformation])],
  exports: [FinancialInformationService],
})
export class FinancialInformationModule {}

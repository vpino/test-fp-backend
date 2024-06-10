import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanInformationService } from './loan-information.service';
import { LoanInformation } from './entities/loan-information.entity';
import { LoanInformationController } from './loan-information.controller';

@Module({
  providers: [LoanInformationService],
  controllers: [LoanInformationController],
  imports: [TypeOrmModule.forFeature([LoanInformation])],
  exports: [LoanInformationService],
})
export class LoanInformationModule {}

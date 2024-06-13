import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalLoan } from './entities/personal-loan.entity';
import { PersonalLoanService } from './personal-loan.service';
import { PersonalLoanController } from './personal-loan.controller';
import { CreditCardModule } from '../credit-card/credit-card.module';
import { HomeLoanModule } from '../home-loan/home-loan.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonalLoan]),
    CreditCardModule,
    HomeLoanModule,
  ],
  controllers: [PersonalLoanController],
  providers: [PersonalLoanService],
  exports: [PersonalLoanService],
})
export class PersonalLoanModule {}

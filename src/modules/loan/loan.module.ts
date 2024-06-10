import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { Loan } from './entities/loan.entity';
import { PersonaModule } from '../persona/persona.module';
import { LoanInformationModule } from '../loan-information/loan-information.module';
import { MortgageInformationModule } from '../mortgage-information/mortgage-information.module';
import { CreditInformationModule } from '../credit-information/credit-information.module';
import { FinancialInformationModule } from '../financial-information/financial-information.module';
import { EducationInformationModule } from '../education-information/education-information.module';
import { LegalInformationModule } from '../legal-information/legal-information.module';
import { ClientTagsModule } from '../client-tags/client-tags.module';

@Module({
  providers: [LoanService],
  controllers: [LoanController],
  imports: [
    TypeOrmModule.forFeature([Loan]),
    PersonaModule,
    LoanInformationModule,
    MortgageInformationModule,
    CreditInformationModule,
    FinancialInformationModule,
    EducationInformationModule,
    LegalInformationModule,
    ClientTagsModule
  ],
  exports: [LoanService],

})
export class LoanModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalLoan } from './entities/personal-loan.entity';
import { PersonalLoanService } from './personal-loan.service';
import { PersonalLoanController } from './personal-loan.controller';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalLoan]), CustomerModule],
  controllers: [PersonalLoanController],
  providers: [PersonalLoanService],
  exports: [PersonalLoanService],
})
export class PersonalLoanModule {}

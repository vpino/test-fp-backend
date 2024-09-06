import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeLoan } from './entities/home-loan.entity';
import { HomeLoanService } from './home-loan.service';
import { HomeLoanController } from './home-loan.controller';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([HomeLoan]), CustomerModule],
  controllers: [HomeLoanController],
  providers: [HomeLoanService],
  exports: [HomeLoanService],
})
export class HomeLoanModule {}

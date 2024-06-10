import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndividualCustomerService } from './individual-customer.service';
import { IndividualCustomer } from './entities/individual-customer.entity';
import { IndividualCustomerController } from './individual-customer.controller';

@Module({
  providers: [IndividualCustomerService],
  controllers: [IndividualCustomerController],
  imports: [TypeOrmModule.forFeature([IndividualCustomer])],
  exports: [IndividualCustomerService],
})
export class IndividualCustomerModule {}

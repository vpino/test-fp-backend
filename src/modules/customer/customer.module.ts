import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { CustomerController } from './customer.controller';
import { IndividualCustomerModule } from '../individual-customer/individual-customer.module';

@Module({
  providers: [CustomerService],
  controllers: [CustomerController],
  imports: [
    TypeOrmModule.forFeature([Customer]),
    IndividualCustomerModule
  ],
  exports: [CustomerService],

})
export class CustomerModule {}

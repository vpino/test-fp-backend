import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { IndividualCustomer } from './entities/individual-customer.entity';

@Injectable()
export class IndividualCustomerService extends CrudService<IndividualCustomer> {
  constructor(
    @InjectRepository(IndividualCustomer) private individualCustomerRepository: Repository<IndividualCustomer>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(individualCustomerRepository, 'id', dataSourceInject);
  }
}

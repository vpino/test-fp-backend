import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FinancialInformation } from './entities/financial-information.entity';

@Injectable()
export class FinancialInformationService extends CrudService<FinancialInformation> {
  constructor(
    @InjectRepository(FinancialInformation)
    private financialInformationRepository: Repository<FinancialInformation>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(financialInformationRepository, 'id', dataSourceInject);
  }
}

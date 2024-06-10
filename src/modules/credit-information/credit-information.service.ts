import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreditInformation } from './entities/credit-information.entity';

@Injectable()
export class CreditInformationService extends CrudService<CreditInformation> {
  constructor(
    @InjectRepository(CreditInformation) private creditInformationRepository: Repository<CreditInformation>,
    private readonly dataSourceInject: DataSource
  ) {
    super(creditInformationRepository, 'id', dataSourceInject);
  }
}

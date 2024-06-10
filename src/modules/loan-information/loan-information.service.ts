import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { LoanInformation } from './entities/loan-information.entity';

@Injectable()
export class LoanInformationService extends CrudService<LoanInformation> {
  constructor(
    @InjectRepository(LoanInformation)
    private loanInformationRepository: Repository<LoanInformation>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(loanInformationRepository, 'id', dataSourceInject);
  }
}

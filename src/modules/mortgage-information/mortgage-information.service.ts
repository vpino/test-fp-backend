import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MortgageInformation } from './entities/mortgage-information.entity';

@Injectable()
export class MortgageInformationService extends CrudService<MortgageInformation> {
  constructor(
    @InjectRepository(MortgageInformation)
    private mortgageInformationRepository: Repository<MortgageInformation>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(mortgageInformationRepository, 'id', dataSourceInject);
  }
}

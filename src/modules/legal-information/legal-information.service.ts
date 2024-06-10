import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { LegalInformation } from './entities/legal-information.entity';

@Injectable()
export class LegalInformationService extends CrudService<LegalInformation> {
  constructor(
    @InjectRepository(LegalInformation) private legalInformationRepository: Repository<LegalInformation>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(legalInformationRepository, 'id', dataSourceInject);
  }
}

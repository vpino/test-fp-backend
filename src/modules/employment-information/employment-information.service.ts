import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { EmploymentInformation } from './entities/employment-information.entity';

@Injectable()
export class EmploymentInformationService extends CrudService<EmploymentInformation> {
  constructor(
    @InjectRepository(EmploymentInformation)
    private employmentInformationRepository: Repository<EmploymentInformation>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(employmentInformationRepository, 'id', dataSourceInject);
  }
}

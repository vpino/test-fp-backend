import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { EducationInformation } from './entities/education-information.entity';

@Injectable()
export class EducationInformationService extends CrudService<EducationInformation> {
  constructor(
    @InjectRepository(EducationInformation)
    private educationInformationRepository: Repository<EducationInformation>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(educationInformationRepository, 'id', dataSourceInject);
  }
}

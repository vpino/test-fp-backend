import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProviderInformation } from './entities/provider-information.entity';

@Injectable()
export class ProviderInformationService extends CrudService<ProviderInformation> {
  constructor(
    @InjectRepository(ProviderInformation)
    private providerInformationRepository: Repository<ProviderInformation>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(providerInformationRepository, 'id', dataSourceInject);
  }
}

import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AddressInformation } from './entities/address-information.entity';

@Injectable()
export class AddressInformationService  extends CrudService<AddressInformation> {
  constructor(
    @InjectRepository(AddressInformation) private addressInformationRepository: Repository<AddressInformation>,
    private readonly dataSourceInject: DataSource,

  ) {
    super(addressInformationRepository, 'id', dataSourceInject);
  }

}

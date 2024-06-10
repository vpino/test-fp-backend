import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ConsumerIdentity } from './entities/consumer-identity.entity';

@Injectable()
export class ConsumerIdentityService extends CrudService<ConsumerIdentity> {
  constructor(
    @InjectRepository(ConsumerIdentity)
    private consumerIdentityRepository: Repository<ConsumerIdentity>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(consumerIdentityRepository, 'id', dataSourceInject);
  }
}

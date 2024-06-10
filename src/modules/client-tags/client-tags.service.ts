import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ClientTags } from './entities/client-tags.entity';

@Injectable()
export class ClientTagsService extends CrudService<ClientTags> {
  constructor(
    @InjectRepository(ClientTags)
    private clientTagsRepository: Repository<ClientTags>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(clientTagsRepository, 'id', dataSourceInject);
  }
}

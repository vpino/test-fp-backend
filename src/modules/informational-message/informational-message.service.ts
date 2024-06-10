import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { InformationalMessage } from './entities/informational-message.entity';

@Injectable()
export class InformationalMessageService extends CrudService<InformationalMessage> {
  constructor(
    @InjectRepository(InformationalMessage)
    private informationalMessageRepository: Repository<InformationalMessage>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(informationalMessageRepository, 'id', dataSourceInject);
  }
}

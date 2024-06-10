import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { HeaderRecord } from './entities/header-record.entity';

@Injectable()
export class HeaderRecordService extends CrudService<HeaderRecord> {
  constructor(
    @InjectRepository(HeaderRecord)
    private headerRecordRepository: Repository<HeaderRecord>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(headerRecordRepository, 'id', dataSourceInject);
  }
}

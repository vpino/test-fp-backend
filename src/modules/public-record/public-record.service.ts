
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PublicRecord } from './entities/public-record.entity';

@Injectable()
export class PublicRecordService extends CrudService<PublicRecord> {
  constructor(
    @InjectRepository(PublicRecord) private publicRecordRepository: Repository<PublicRecord>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(publicRecordRepository, 'id', dataSourceInject);
  }
}

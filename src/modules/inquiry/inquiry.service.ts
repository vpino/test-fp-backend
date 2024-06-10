
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Inquiry } from './entities/inquiry.entity';

@Injectable()
export class InquiryService extends CrudService<Inquiry> {
  constructor(
    @InjectRepository(Inquiry) private inquiryRepository: Repository<Inquiry>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(inquiryRepository, 'id', dataSourceInject);
  }
}

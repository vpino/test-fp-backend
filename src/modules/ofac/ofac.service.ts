import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Ofac } from './entities/ofac.entity';

@Injectable()
export class OfacService extends CrudService<Ofac> {
  constructor(
    @InjectRepository(Ofac) private ofacRepository: Repository<Ofac>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(ofacRepository, 'id', dataSourceInject);
  }
}

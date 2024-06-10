import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Name } from './entities/name.entity';

@Injectable()
export class NameService extends CrudService<Name> {
  constructor(
    @InjectRepository(Name) private nameRepository: Repository<Name>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(nameRepository, 'id', dataSourceInject);
  }
}

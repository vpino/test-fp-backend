
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Tradeline } from './entities/tradeline.entity';

@Injectable()
export class TradelineService extends CrudService<Tradeline> {
  constructor(
    @InjectRepository(Tradeline) private tradelineRepository: Repository<Tradeline>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(tradelineRepository, 'id', dataSourceInject);
  }
}

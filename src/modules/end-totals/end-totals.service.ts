
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { EndTotals } from './entities/end-totals.entity';

@Injectable()
export class EndTotalsService extends CrudService<EndTotals> {
  constructor(
    @InjectRepository(EndTotals) private endTotalsRepository: Repository<EndTotals>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(endTotalsRepository, 'id', dataSourceInject);
  }
}

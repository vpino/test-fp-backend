
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RiskModel } from './entities/risk-model.entity';

@Injectable()
export class RiskModelService extends CrudService<RiskModel> {
  constructor(
    @InjectRepository(RiskModel) private riskModelRepository: Repository<RiskModel>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(riskModelRepository, 'id', dataSourceInject);
  }
}

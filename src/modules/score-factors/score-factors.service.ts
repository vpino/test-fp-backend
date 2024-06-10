
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ScoreFactors } from './entities/score-factors.entity';

@Injectable()
export class ScoreFactorsService extends CrudService<ScoreFactors> {
  constructor(
    @InjectRepository(ScoreFactors) private scoreFactorsRepository: Repository<ScoreFactors>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(scoreFactorsRepository, 'id', dataSourceInject);
  }
}

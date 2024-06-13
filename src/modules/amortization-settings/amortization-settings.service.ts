import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AmortizationSettings } from './entities/amortization-settings.entity';

@Injectable()
export class AmortizationSettingsService extends CrudService<AmortizationSettings> {
  constructor(
    @InjectRepository(AmortizationSettings)
    private amortizationSettingsRepository: Repository<AmortizationSettings>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(amortizationSettingsRepository, 'id', dataSourceInject);
  }
}

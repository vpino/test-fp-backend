
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { EnhancedPaymentData } from './entities/enhanced-payment-data.entity';

@Injectable()
export class EnhancedPaymentDataService extends CrudService<EnhancedPaymentData> {
  constructor(
    @InjectRepository(EnhancedPaymentData) private enhancedPaymentDataRepository: Repository<EnhancedPaymentData>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(enhancedPaymentDataRepository, 'id', dataSourceInject);
  }
}

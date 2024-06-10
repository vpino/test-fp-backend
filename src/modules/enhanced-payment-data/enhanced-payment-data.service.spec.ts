
import { Test, TestingModule } from '@nestjs/testing';
import { EnhancedPaymentDataService } from './enhanced-payment-data.service';

describe('EnhancedPaymentDataService', () => {
  let service: EnhancedPaymentDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnhancedPaymentDataService],
    }).compile();

    service = module.get<EnhancedPaymentDataService>(EnhancedPaymentDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { EnhancedPaymentDataController } from './enhanced-payment-data.controller';
import { EnhancedPaymentDataService } from './enhanced-payment-data.service';

describe('EnhancedPaymentDataController', () => {
  let controller: EnhancedPaymentDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnhancedPaymentDataController],
      providers: [EnhancedPaymentDataService],
    }).compile();

    controller = module.get<EnhancedPaymentDataController>(
      EnhancedPaymentDataController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

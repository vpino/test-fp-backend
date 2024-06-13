import { Test, TestingModule } from '@nestjs/testing';
import { AmortizationSettingsService } from './amortization-settings.service';

describe('AmortizationSettingsService', () => {
  let service: AmortizationSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmortizationSettingsService],
    }).compile();

    service = module.get<AmortizationSettingsService>(
      AmortizationSettingsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

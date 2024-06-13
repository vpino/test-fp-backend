
import { Test, TestingModule } from '@nestjs/testing';
import { AmortizationSettingsController } from './amortization-settings.controller';
import { AmortizationSettingsService } from './amortization-settings.service';

describe('AmortizationSettingsController', () => {
  let controller: AmortizationSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmortizationSettingsController],
      providers: [AmortizationSettingsService],
    }).compile();

    controller = module.get<AmortizationSettingsController>(AmortizationSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});


import { Test, TestingModule } from '@nestjs/testing';
import { RiskModelController } from './risk-model.controller';
import { RiskModelService } from './risk-model.service';

describe('RiskModelController', () => {
  let controller: RiskModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskModelController],
      providers: [RiskModelService],
    }).compile();

    controller = module.get<RiskModelController>(RiskModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

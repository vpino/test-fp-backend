
import { Test, TestingModule } from '@nestjs/testing';
import { RiskModelService } from './risk-model.service';

describe('RiskModelService', () => {
  let service: RiskModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskModelService],
    }).compile();

    service = module.get<RiskModelService>(RiskModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

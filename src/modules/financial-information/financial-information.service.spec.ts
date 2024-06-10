import { Test, TestingModule } from '@nestjs/testing';
import { FinancialInformationService } from './financial-information.service';

describe('FinancialInformationService', () => {
  let service: FinancialInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialInformationService],
    }).compile();

    service = module.get<FinancialInformationService>(
      FinancialInformationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

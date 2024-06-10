import { Test, TestingModule } from '@nestjs/testing';
import { CreditInformationService } from './credit-information.service';

describe('CreditInformationService', () => {
  let service: CreditInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditInformationService],
    }).compile();

    service = module.get<CreditInformationService>(CreditInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

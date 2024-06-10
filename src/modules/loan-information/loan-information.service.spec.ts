import { Test, TestingModule } from '@nestjs/testing';
import { LoanInformationService } from './loan-information.service';

describe('LoanInformationService', () => {
  let service: LoanInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanInformationService],
    }).compile();

    service = module.get<LoanInformationService>(LoanInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


import { Test, TestingModule } from '@nestjs/testing';
import { BridgeLoanService } from './bridge-loan.service';

describe('BridgeLoanService', () => {
  let service: BridgeLoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BridgeLoanService],
    }).compile();

    service = module.get<BridgeLoanService>(BridgeLoanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

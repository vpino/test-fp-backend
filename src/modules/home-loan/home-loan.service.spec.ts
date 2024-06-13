
import { Test, TestingModule } from '@nestjs/testing';
import { HomeLoanService } from './home-loan.service';

describe('HomeLoanService', () => {
  let service: HomeLoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeLoanService],
    }).compile();

    service = module.get<HomeLoanService>(HomeLoanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

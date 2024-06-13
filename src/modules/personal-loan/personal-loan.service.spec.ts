
import { Test, TestingModule } from '@nestjs/testing';
import { PersonalLoanService } from './personal-loan.service';

describe('PersonalLoanService', () => {
  let service: PersonalLoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalLoanService],
    }).compile();

    service = module.get<PersonalLoanService>(PersonalLoanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

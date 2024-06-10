import { Test, TestingModule } from '@nestjs/testing';
import { IndividualCustomerService } from './individual-customer.service';

describe('IndividualCustomerService', () => {
  let service: IndividualCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndividualCustomerService],
    }).compile();

    service = module.get<IndividualCustomerService>(IndividualCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

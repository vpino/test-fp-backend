import { Test, TestingModule } from '@nestjs/testing';
import { OfacService } from './ofac.service';

describe('OfacService', () => {
  let service: OfacService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfacService],
    }).compile();

    service = module.get<OfacService>(OfacService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

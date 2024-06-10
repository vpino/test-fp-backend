import { Test, TestingModule } from '@nestjs/testing';
import { EndTotalsService } from './end-totals.service';

describe('EndTotalsService', () => {
  let service: EndTotalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndTotalsService],
    }).compile();

    service = module.get<EndTotalsService>(EndTotalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

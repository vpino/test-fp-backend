
import { Test, TestingModule } from '@nestjs/testing';
import { TradelineService } from './tradeline.service';

describe('TradelineService', () => {
  let service: TradelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradelineService],
    }).compile();

    service = module.get<TradelineService>(TradelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

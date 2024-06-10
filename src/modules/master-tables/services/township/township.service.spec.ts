import { Test, TestingModule } from '@nestjs/testing';
import { TownshipService } from './township.service';

describe('TownshipService', () => {
  let service: TownshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TownshipService],
    }).compile();

    service = module.get<TownshipService>(TownshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

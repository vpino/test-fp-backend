
import { Test, TestingModule } from '@nestjs/testing';
import { ScoreFactorsService } from './score-factors.service';

describe('ScoreFactorsService', () => {
  let service: ScoreFactorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreFactorsService],
    }).compile();

    service = module.get<ScoreFactorsService>(ScoreFactorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

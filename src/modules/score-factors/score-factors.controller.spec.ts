import { Test, TestingModule } from '@nestjs/testing';
import { ScoreFactorsController } from './score-factors.controller';
import { ScoreFactorsService } from './score-factors.service';

describe('ScoreFactorsController', () => {
  let controller: ScoreFactorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreFactorsController],
      providers: [ScoreFactorsService],
    }).compile();

    controller = module.get<ScoreFactorsController>(ScoreFactorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { EndTotalsController } from './end-totals.controller';
import { EndTotalsService } from './end-totals.service';

describe('EndTotalsController', () => {
  let controller: EndTotalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EndTotalsController],
      providers: [EndTotalsService],
    }).compile();

    controller = module.get<EndTotalsController>(EndTotalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

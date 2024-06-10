
import { Test, TestingModule } from '@nestjs/testing';
import { TradelineController } from './tradeline.controller';
import { TradelineService } from './tradeline.service';

describe('TradelineController', () => {
  let controller: TradelineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradelineController],
      providers: [TradelineService],
    }).compile();

    controller = module.get<TradelineController>(TradelineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

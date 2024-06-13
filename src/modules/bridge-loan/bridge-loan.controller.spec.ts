
import { Test, TestingModule } from '@nestjs/testing';
import { BridgeLoanController } from './bridge-loan.controller';
import { BridgeLoanService } from './bridge-loan.service';

describe('BridgeLoanController', () => {
  let controller: BridgeLoanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BridgeLoanController],
      providers: [BridgeLoanService],
    }).compile();

    controller = module.get<BridgeLoanController>(BridgeLoanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

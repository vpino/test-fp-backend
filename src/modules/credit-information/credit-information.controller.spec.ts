import { Test, TestingModule } from '@nestjs/testing';
import { CreditInformationController } from './credit-information.controller';

describe('CreditInformationController', () => {
  let controller: CreditInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditInformationController],
    }).compile();

    controller = module.get<CreditInformationController>(CreditInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

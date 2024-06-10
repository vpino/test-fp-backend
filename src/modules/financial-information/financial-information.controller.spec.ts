import { Test, TestingModule } from '@nestjs/testing';
import { FinancialInformationController } from './financial-information.controller';

describe('FinancialInformationController', () => {
  let controller: FinancialInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialInformationController],
    }).compile();

    controller = module.get<FinancialInformationController>(
      FinancialInformationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MortgageInformationController } from './mortgage-information.controller';

describe('MortgageInformationController', () => {
  let controller: MortgageInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MortgageInformationController],
    }).compile();

    controller = module.get<MortgageInformationController>(MortgageInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { LegalInformationController } from './legal-information.controller';

describe('LegalInformationController', () => {
  let controller: LegalInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegalInformationController],
    }).compile();

    controller = module.get<LegalInformationController>(LegalInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

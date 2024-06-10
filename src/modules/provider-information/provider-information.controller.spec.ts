import { Test, TestingModule } from '@nestjs/testing';
import { ProviderInformationController } from './provider-information.controller';

describe('ProviderInformationController', () => {
  let controller: ProviderInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderInformationController],
    }).compile();

    controller = module.get<ProviderInformationController>(
      ProviderInformationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProviderInformationService } from './provider-information.service';

describe('ProviderInformationService', () => {
  let service: ProviderInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProviderInformationService],
    }).compile();

    service = module.get<ProviderInformationService>(ProviderInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

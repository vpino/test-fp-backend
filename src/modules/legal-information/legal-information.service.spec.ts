import { Test, TestingModule } from '@nestjs/testing';
import { LegalInformationService } from './legal-information.service';

describe('LegalInformationService', () => {
  let service: LegalInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegalInformationService],
    }).compile();

    service = module.get<LegalInformationService>(LegalInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

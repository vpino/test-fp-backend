import { Test, TestingModule } from '@nestjs/testing';
import { AddressInformationService } from './address-information.service';

describe('AddressInformationService', () => {
  let service: AddressInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressInformationService],
    }).compile();

    service = module.get<AddressInformationService>(AddressInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

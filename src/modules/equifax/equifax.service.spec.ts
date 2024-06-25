import { Test, TestingModule } from '@nestjs/testing';
import { EquifaxService } from './equifax.service';

describe('EquifaxService', () => {
  let service: EquifaxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquifaxService],
    }).compile();

    service = module.get<EquifaxService>(EquifaxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

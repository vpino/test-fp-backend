import { Test, TestingModule } from '@nestjs/testing';
import { ExperianService } from './experian.service';

describe('ExperianService', () => {
  let service: ExperianService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperianService],
    }).compile();

    service = module.get<ExperianService>(ExperianService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

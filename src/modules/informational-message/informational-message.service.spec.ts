
import { Test, TestingModule } from '@nestjs/testing';
import { InformationalMessageService } from './informational-message.service';

describe('InformationalMessageService', () => {
  let service: InformationalMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformationalMessageService],
    }).compile();

    service = module.get<InformationalMessageService>(InformationalMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

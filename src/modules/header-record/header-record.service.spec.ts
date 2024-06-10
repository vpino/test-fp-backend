import { Test, TestingModule } from '@nestjs/testing';
import { HeaderRecordService } from './header-record.service';

describe('HeaderRecordService', () => {
  let service: HeaderRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeaderRecordService],
    }).compile();

    service = module.get<HeaderRecordService>(HeaderRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

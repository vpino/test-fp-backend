
import { Test, TestingModule } from '@nestjs/testing';
import { PublicRecordService } from './public-record.service';

describe('PublicRecordService', () => {
  let service: PublicRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicRecordService],
    }).compile();

    service = module.get<PublicRecordService>(PublicRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

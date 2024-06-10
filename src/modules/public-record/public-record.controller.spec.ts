
import { Test, TestingModule } from '@nestjs/testing';
import { PublicRecordController } from './public-record.controller';
import { PublicRecordService } from './public-record.service';

describe('PublicRecordController', () => {
  let controller: PublicRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicRecordController],
      providers: [PublicRecordService],
    }).compile();

    controller = module.get<PublicRecordController>(PublicRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

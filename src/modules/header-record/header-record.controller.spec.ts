import { Test, TestingModule } from '@nestjs/testing';
import { HeaderRecordController } from './header-record.controller';

describe('HeaderRecordController', () => {
  let controller: HeaderRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeaderRecordController],
    }).compile();

    controller = module.get<HeaderRecordController>(HeaderRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

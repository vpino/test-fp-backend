
import { Test, TestingModule } from '@nestjs/testing';
import { InformationalMessageController } from './informational-message.controller';
import { InformationalMessageService } from './informational-message.service';

describe('InformationalMessageController', () => {
  let controller: InformationalMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformationalMessageController],
      providers: [InformationalMessageService],
    }).compile();

    controller = module.get<InformationalMessageController>(InformationalMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

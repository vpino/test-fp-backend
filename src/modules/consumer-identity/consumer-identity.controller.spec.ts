
import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerIdentityController } from './consumer-identity.controller';
import { ConsumerIdentityService } from './consumer-identity.service';

describe('ConsumerIdentityController', () => {
  let controller: ConsumerIdentityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumerIdentityController],
      providers: [ConsumerIdentityService],
    }).compile();

    controller = module.get<ConsumerIdentityController>(ConsumerIdentityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

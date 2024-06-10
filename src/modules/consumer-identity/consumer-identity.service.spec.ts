import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerIdentityService } from './consumer-identity.service';

describe('ConsumerIdentityService', () => {
  let service: ConsumerIdentityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumerIdentityService],
    }).compile();

    service = module.get<ConsumerIdentityService>(ConsumerIdentityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


import { Test, TestingModule } from '@nestjs/testing';
import { UserRiskService } from './user-risk.service';

describe('UserRiskService', () => {
  let service: UserRiskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRiskService],
    }).compile();

    service = module.get<UserRiskService>(UserRiskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

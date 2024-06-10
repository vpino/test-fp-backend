import { Test, TestingModule } from '@nestjs/testing';
import { UserRiskController } from './user-risk.controller';
import { UserRiskService } from './user-risk.service';

describe('UserRiskController', () => {
  let controller: UserRiskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRiskController],
      providers: [UserRiskService],
    }).compile();

    controller = module.get<UserRiskController>(UserRiskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

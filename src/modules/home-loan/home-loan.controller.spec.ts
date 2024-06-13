
import { Test, TestingModule } from '@nestjs/testing';
import { HomeLoanController } from './home-loan.controller';
import { HomeLoanService } from './home-loan.service';

describe('HomeLoanController', () => {
  let controller: HomeLoanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeLoanController],
      providers: [HomeLoanService],
    }).compile();

    controller = module.get<HomeLoanController>(HomeLoanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

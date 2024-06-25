import { Test, TestingModule } from '@nestjs/testing';
import { EquifaxController } from './equifax.controller';
import { EquifaxService } from './equifax.service';

describe('EquifaxController', () => {
  let controller: EquifaxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquifaxController],
      providers: [EquifaxService],
    }).compile();

    controller = module.get<EquifaxController>(EquifaxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

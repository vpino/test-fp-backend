
import { Test, TestingModule } from '@nestjs/testing';
import { OfacController } from './ofac.controller';
import { OfacService } from './ofac.service';

describe('OfacController', () => {
  let controller: OfacController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfacController],
      providers: [OfacService],
    }).compile();

    controller = module.get<OfacController>(OfacController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

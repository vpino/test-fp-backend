import { Test, TestingModule } from '@nestjs/testing';
import { MasterTablesController } from './master-tables.controller';

describe('MasterTablesController', () => {
  let controller: MasterTablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterTablesController],
    }).compile();

    controller = module.get<MasterTablesController>(MasterTablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

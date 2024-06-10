import { Test, TestingModule } from '@nestjs/testing';
import { ClientTagsController } from './client-tags.controller';

describe('ClientTagsController', () => {
  let controller: ClientTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientTagsController],
    }).compile();

    controller = module.get<ClientTagsController>(ClientTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

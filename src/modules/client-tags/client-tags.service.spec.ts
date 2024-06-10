import { Test, TestingModule } from '@nestjs/testing';
import { ClientTagsService } from './client-tags.service';

describe('ClientTagsService', () => {
  let service: ClientTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientTagsService],
    }).compile();

    service = module.get<ClientTagsService>(ClientTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

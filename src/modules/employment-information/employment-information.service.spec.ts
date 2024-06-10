import { Test, TestingModule } from '@nestjs/testing';
import { EmploymentInformationService } from './employment-information.service';

describe('EmploymentInformationService', () => {
  let service: EmploymentInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmploymentInformationService],
    }).compile();

    service = module.get<EmploymentInformationService>(
      EmploymentInformationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

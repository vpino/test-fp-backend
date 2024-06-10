import { Test, TestingModule } from '@nestjs/testing';
import { EmploymentInformationController } from './employment-information.controller';
import { EmploymentInformationService } from './employment-information.service';

describe('EmploymentInformationController', () => {
  let controller: EmploymentInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmploymentInformationController],
      providers: [EmploymentInformationService],
    }).compile();

    controller = module.get<EmploymentInformationController>(
      EmploymentInformationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

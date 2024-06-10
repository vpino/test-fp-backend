import { Test, TestingModule } from '@nestjs/testing';
import { EducationInformationController } from './education-information.controller';

describe('EducationInformationController', () => {
  let controller: EducationInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationInformationController],
    }).compile();

    controller = module.get<EducationInformationController>(EducationInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

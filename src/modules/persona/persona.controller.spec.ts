import { Test, TestingModule } from '@nestjs/testing';
import { PersonaController } from './persona.controller';

describe('PersonaController', () => {
  let controller: PersonaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonaController],
    }).compile();

    controller = module.get<PersonaController>(PersonaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

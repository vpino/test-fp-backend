import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { Persona } from './entities/persona.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PersonaService extends CrudService<Persona> {
  constructor(
    @InjectRepository(Persona) private personaRepository: Repository<Persona>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(personaRepository, 'id', dataSourceInject);
  }
}

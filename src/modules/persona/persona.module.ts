import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { Persona } from './entities/persona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PersonaService],
  controllers: [PersonaController],
  imports: [
    TypeOrmModule.forFeature([Persona])
  ],
  exports: [PersonaService],

})
export class PersonaModule {}

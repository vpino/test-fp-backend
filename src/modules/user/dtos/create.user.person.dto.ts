import { CreatePersonaDto } from '../../persona/dtos/create.persona.dto';
import { CreateUserDto } from './create.user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class CreateUserAndPersonaDto {
  @ApiProperty()
  @IsObject()
  user: CreateUserDto;

  @ApiProperty()
  @IsObject()
  persona: CreatePersonaDto;
}

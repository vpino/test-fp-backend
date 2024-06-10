import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PersonaService } from './persona.service';
import { ResponseDTO } from '../../common/dtos/response.dto';
import { CreatePersonaDto } from './dtos/create.persona.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Persona')
@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Get()
  @ApiOperation({ summary: 'Get all personas' })
  @ApiResponse({ status: 200, description: 'Return all personas' })
  async getAll(): Promise<ResponseDTO> {
    return this.personaService.getAll({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a persona by id' })
  @ApiResponse({ status: 200, description: 'Return a persona' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return this.personaService.findOne({ id });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new persona' })
  @ApiResponse({
    status: 201,
    description: 'The persona has been successfully created.',
  })
  async create(@Body() personaData: CreatePersonaDto): Promise<ResponseDTO> {
    return { data: this.personaService.create(personaData) }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a persona' })
  @ApiResponse({
    status: 200,
    description: 'The persona has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() personaData: CreatePersonaDto,
  ): Promise<ResponseDTO> {
    return this.personaService.update(id, personaData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a persona' })
  @ApiResponse({
    status: 200,
    description: 'The persona has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return this.personaService.deleteOne({ _id: id });
  }
}

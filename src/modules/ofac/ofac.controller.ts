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
import { ResponseDTO } from '../../common/dtos/response.dto';
import { SkipJwtAuth } from 'src/common/decorators/skip-guard.decorator';
import { OfacService } from './ofac.service';
import { CreateOfacDto } from './dtos/create.ofac.dto';
import { UpdateOfacDto } from './dtos/update.ofac.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Ofac')
@Controller('ofac')
export class OfacController {
  constructor(private readonly ofacService: OfacService) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all Ofacs' })
  @ApiResponse({ status: 200, description: 'Return all Ofacs' })
  async getAll(): Promise<ResponseDTO> {
    return await this.ofacService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a Ofac by id' })
  @ApiResponse({ status: 200, description: 'Return a Ofac' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.ofacService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new Ofac' })
  @ApiResponse({
    status: 201,
    description: 'The Ofac has been successfully created.',
  })
  async create(@Body() ofac: CreateOfacDto): Promise<ResponseDTO> {
    return { data: await this.ofacService.create(ofac) };
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a Ofac' })
  @ApiResponse({
    status: 200,
    description: 'The Ofac has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() ofac: UpdateOfacDto,
  ): Promise<ResponseDTO> {
    return await this.ofacService.update(id, ofac);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Ofac' })
  @ApiResponse({
    status: 200,
    description: 'The Ofac has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.ofacService.deleteOne({ id });
  }
}

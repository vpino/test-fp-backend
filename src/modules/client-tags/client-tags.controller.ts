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
import { ClientTagsService } from './client-tags.service';
import { CreateClientTagsDto } from './dtos/create.client-tags.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Client-Tags')
@Controller('client-tags')
export class ClientTagsController {
  constructor(private readonly clientTagsService: ClientTagsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Client tagss' })
  @ApiResponse({ status: 200, description: 'Return all Client tagss' })
  async getAll(): Promise<ResponseDTO> {
    return this.clientTagsService.getAll({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Client tags by id' })
  @ApiResponse({ status: 200, description: 'Return a Client tags' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return this.clientTagsService.findOne({ id });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Client tags' })
  @ApiResponse({
    status: 201,
    description: 'The Client tags has been successfully created.',
  })
  async create(@Body() clientTags: CreateClientTagsDto): Promise<ResponseDTO> {
    return { data: this.clientTagsService.create(clientTags) }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Client tags' })
  @ApiResponse({
    status: 200,
    description: 'The Client tags has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() clientTags: CreateClientTagsDto,
  ): Promise<ResponseDTO> {
    return this.clientTagsService.update(id, clientTags);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Client tags' })
  @ApiResponse({
    status: 200,
    description: 'The Client tags has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return this.clientTagsService.deleteOne({ _id: id });
  }
}


import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ResponseDTO } from '../../common/dtos/response.dto';
import { SkipJwtAuth } from 'src/common/decorators/skip-guard.decorator';
import { NameService } from './name.service';
import { CreateNameDto } from './dtos/create.name.dto';
import { UpdateNameDto } from './dtos/update.name.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Name')
@Controller('name')
export class NameController {
  constructor(private readonly nameService: NameService) { }

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all Names' })
  @ApiResponse({ status: 200, description: 'Return all Names' })
  async getAll(): Promise<ResponseDTO> {
    return await this.nameService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a Name by id' })
  @ApiResponse({ status: 200, description: 'Return a Name' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.nameService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new Name' })
  @ApiResponse({
    status: 201,
    description: 'The Name has been successfully created.',
  })
  async create(@Body() name: CreateNameDto): Promise<ResponseDTO> {
    return { data: await this.nameService.create(name) }
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a Name' })
  @ApiResponse({
    status: 200,
    description: 'The Name has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() name: UpdateNameDto,
  ): Promise<ResponseDTO> {
    return await this.nameService.update(id, name);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Name' })
  @ApiResponse({
    status: 200,
    description: 'The Name has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.nameService.deleteOne({ id });
  }
}

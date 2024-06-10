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
import { PublicRecordService } from './public-record.service';
import { CreatePublicRecordDto } from './dtos/create.public-record.dto';
import { UpdatePublicRecordDto } from './dtos/update.public-record.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('PublicRecord')
@Controller('public-record')
export class PublicRecordController {
  constructor(private readonly publicRecordService: PublicRecordService) { }

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all PublicRecords' })
  @ApiResponse({ status: 200, description: 'Return all PublicRecords' })
  async getAll(): Promise<ResponseDTO> {
    return await this.publicRecordService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a PublicRecord by id' })
  @ApiResponse({ status: 200, description: 'Return a PublicRecord' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.publicRecordService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new PublicRecord' })
  @ApiResponse({
    status: 201,
    description: 'The PublicRecord has been successfully created.',
  })
  async create(@Body() publicRecord: CreatePublicRecordDto): Promise<ResponseDTO> {
    return { data: await this.publicRecordService.create(publicRecord) }
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a PublicRecord' })
  @ApiResponse({
    status: 200,
    description: 'The PublicRecord has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() publicRecord: UpdatePublicRecordDto,
  ): Promise<ResponseDTO> {
    return await this.publicRecordService.update(id, publicRecord);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a PublicRecord' })
  @ApiResponse({
    status: 200,
    description: 'The PublicRecord has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.publicRecordService.deleteOne({ id });
  }
}

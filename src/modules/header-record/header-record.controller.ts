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
import { HeaderRecordService } from './header-record.service';
import { CreateHeaderRecordDto } from './dtos/create.header-record.dto';
import { UpdateHeaderRecordDto } from './dtos/update.header-record.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Header Record')
@Controller('header-record')
export class HeaderRecordController {
  constructor(private readonly headerRecordService: HeaderRecordService) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all Header Record' })
  @ApiResponse({ status: 200, description: 'Return all Header Record' })
  async getAll(): Promise<ResponseDTO> {
    return await this.headerRecordService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a Header Record by id' })
  @ApiResponse({ status: 200, description: 'Return a Header Record' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.headerRecordService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new Header Record' })
  @ApiResponse({
    status: 201,
    description: 'The Header Record has been successfully created.',
  })
  async create(
    @Body() headerRecord: CreateHeaderRecordDto,
  ): Promise<ResponseDTO> {
    return { data: await this.headerRecordService.create(headerRecord) };
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a Header Record' })
  @ApiResponse({
    status: 200,
    description: 'The Header Record has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() headerRecord: UpdateHeaderRecordDto,
  ): Promise<ResponseDTO> {
    return await this.headerRecordService.update(id, headerRecord);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Header Record' })
  @ApiResponse({
    status: 200,
    description: 'The Header Record has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.headerRecordService.deleteOne({ _id: id });
  }
}

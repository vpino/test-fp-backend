
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
import { InquiryService } from './inquiry.service';
import { CreateInquiryDto } from './dtos/create.inquiry.dto';
import { UpdateInquiryDto } from './dtos/update.inquiry.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Inquiry')
@Controller('inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) { }

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all Inquirys' })
  @ApiResponse({ status: 200, description: 'Return all Inquirys' })
  async getAll(): Promise<ResponseDTO> {
    return await this.inquiryService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a Inquiry by id' })
  @ApiResponse({ status: 200, description: 'Return a Inquiry' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.inquiryService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new Inquiry' })
  @ApiResponse({
    status: 201,
    description: 'The Inquiry has been successfully created.',
  })
  async create(@Body() inquiry: CreateInquiryDto): Promise<ResponseDTO> {
    return { data: await this.inquiryService.create(inquiry) }
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a Inquiry' })
  @ApiResponse({
    status: 200,
    description: 'The Inquiry has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() inquiry: UpdateInquiryDto,
  ): Promise<ResponseDTO> {
    return await this.inquiryService.update(id, inquiry);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Inquiry' })
  @ApiResponse({
    status: 200,
    description: 'The Inquiry has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.inquiryService.deleteOne({ id });
  }
}

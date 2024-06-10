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
import { FinancialInformationService } from './financial-information.service';
import { CreateFinancialInformationDto } from './dtos/create.financial-information.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Financial-Information')
@Controller('financial-information')
export class FinancialInformationController {
  constructor(private readonly financialInformationService: FinancialInformationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Financial Informations' })
  @ApiResponse({ status: 200, description: 'Return all Financial Informations' })
  async getAll(): Promise<ResponseDTO> {
    return this.financialInformationService.getAll({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Financial Information by id' })
  @ApiResponse({ status: 200, description: 'Return a Financial Information' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return this.financialInformationService.findOne({ id });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Financial Information' })
  @ApiResponse({
    status: 201,
    description: 'The Financial Information has been successfully created.',
  })
  async create(@Body() createFinancialInformationData: CreateFinancialInformationDto): Promise<ResponseDTO> {
    return { data: this.financialInformationService.create(createFinancialInformationData) }
  }


  @Put(':id')
  @ApiOperation({ summary: 'Update a Financial Information' })
  @ApiResponse({
    status: 200,
    description: 'The Financial Information has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() createFinancialInformationData: CreateFinancialInformationDto,
  ): Promise<ResponseDTO> {
    return this.financialInformationService.update(id, createFinancialInformationData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Financial Information' })
  @ApiResponse({
    status: 200,
    description: 'The Financial Information has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return this.financialInformationService.deleteOne({ _id: id });
  }
}

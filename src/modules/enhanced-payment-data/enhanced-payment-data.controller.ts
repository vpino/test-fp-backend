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
import { EnhancedPaymentDataService } from './enhanced-payment-data.service';
import { CreateEnhancedPaymentDataDto } from './dtos/create.enhanced-payment-data.dto';
import { UpdateEnhancedPaymentDataDto } from './dtos/update.enhanced-payment-data.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('EnhancedPaymentData')
@Controller('enhanced-payment-data')
export class EnhancedPaymentDataController {
  constructor(
    private readonly enhancedPaymentDataService: EnhancedPaymentDataService,
  ) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all EnhancedPaymentDatas' })
  @ApiResponse({ status: 200, description: 'Return all EnhancedPaymentDatas' })
  async getAll(): Promise<ResponseDTO> {
    return await this.enhancedPaymentDataService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a EnhancedPaymentData by id' })
  @ApiResponse({ status: 200, description: 'Return a EnhancedPaymentData' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.enhancedPaymentDataService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new EnhancedPaymentData' })
  @ApiResponse({
    status: 201,
    description: 'The EnhancedPaymentData has been successfully created.',
  })
  async create(
    @Body() enhancedPaymentData: CreateEnhancedPaymentDataDto,
  ): Promise<ResponseDTO> {
    return {
      data: await this.enhancedPaymentDataService.create(enhancedPaymentData),
    };
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a EnhancedPaymentData' })
  @ApiResponse({
    status: 200,
    description: 'The EnhancedPaymentData has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() enhancedPaymentData: UpdateEnhancedPaymentDataDto,
  ): Promise<ResponseDTO> {
    return await this.enhancedPaymentDataService.update(
      id,
      enhancedPaymentData,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a EnhancedPaymentData' })
  @ApiResponse({
    status: 200,
    description: 'The EnhancedPaymentData has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.enhancedPaymentDataService.deleteOne({ id });
  }
}

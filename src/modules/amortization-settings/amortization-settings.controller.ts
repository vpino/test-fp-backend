
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
import { AmortizationSettingsService } from './amortization-settings.service';
import { CreateAmortizationSettingsDto } from './dtos/create.amortization-settings.dto';
import { UpdateAmortizationSettingsDto } from './dtos/update.amortization-settings.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('AmortizationSettings')
@Controller('amortization-settings')
export class AmortizationSettingsController {
  constructor(private readonly amortizationSettingsService: AmortizationSettingsService) { }

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all AmortizationSettingss' })
  @ApiResponse({ status: 200, description: 'Return all AmortizationSettingss' })
  async getAll(): Promise<ResponseDTO> {
    return await this.amortizationSettingsService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a AmortizationSettings by id' })
  @ApiResponse({ status: 200, description: 'Return a AmortizationSettings' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.amortizationSettingsService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new AmortizationSettings' })
  @ApiResponse({
    status: 201,
    description: 'The AmortizationSettings has been successfully created.',
  })
  async create(@Body() amortizationSettings: CreateAmortizationSettingsDto): Promise<ResponseDTO> {
    return { data: await this.amortizationSettingsService.create(amortizationSettings) }
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a AmortizationSettings' })
  @ApiResponse({
    status: 200,
    description: 'The AmortizationSettings has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() amortizationSettings: UpdateAmortizationSettingsDto,
  ): Promise<ResponseDTO> {
    return await this.amortizationSettingsService.update(id, amortizationSettings);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a AmortizationSettings' })
  @ApiResponse({
    status: 200,
    description: 'The AmortizationSettings has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.amortizationSettingsService.deleteOne({ id });
  }
}

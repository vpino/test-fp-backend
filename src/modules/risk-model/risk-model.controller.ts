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
import { RiskModelService } from './risk-model.service';
import { CreateRiskModelDto } from './dtos/create.risk-model.dto';
import { UpdateRiskModelDto } from './dtos/update.risk-model.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('RiskModel')
@Controller('risk-model')
export class RiskModelController {
  constructor(private readonly riskModelService: RiskModelService) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all RiskModels' })
  @ApiResponse({ status: 200, description: 'Return all RiskModels' })
  async getAll(): Promise<ResponseDTO> {
    return await this.riskModelService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a RiskModel by id' })
  @ApiResponse({ status: 200, description: 'Return a RiskModel' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.riskModelService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new RiskModel' })
  @ApiResponse({
    status: 201,
    description: 'The RiskModel has been successfully created.',
  })
  async create(@Body() riskModel: CreateRiskModelDto): Promise<ResponseDTO> {
    return { data: await this.riskModelService.create(riskModel) };
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a RiskModel' })
  @ApiResponse({
    status: 200,
    description: 'The RiskModel has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() riskModel: UpdateRiskModelDto,
  ): Promise<ResponseDTO> {
    return await this.riskModelService.update(id, riskModel);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a RiskModel' })
  @ApiResponse({
    status: 200,
    description: 'The RiskModel has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.riskModelService.deleteOne({ id });
  }
}

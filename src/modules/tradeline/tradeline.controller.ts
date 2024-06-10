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
import { TradelineService } from './tradeline.service';
import { CreateTradelineDto } from './dtos/create.tradeline.dto';
import { UpdateTradelineDto } from './dtos/update.tradeline.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Tradeline')
@Controller('tradeline')
export class TradelineController {
  constructor(private readonly tradelineService: TradelineService) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all Tradelines' })
  @ApiResponse({ status: 200, description: 'Return all Tradelines' })
  async getAll(): Promise<ResponseDTO> {
    return await this.tradelineService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a Tradeline by id' })
  @ApiResponse({ status: 200, description: 'Return a Tradeline' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.tradelineService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new Tradeline' })
  @ApiResponse({
    status: 201,
    description: 'The Tradeline has been successfully created.',
  })
  async create(@Body() tradeline: CreateTradelineDto): Promise<ResponseDTO> {
    return { data: await this.tradelineService.create(tradeline) };
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a Tradeline' })
  @ApiResponse({
    status: 200,
    description: 'The Tradeline has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() tradeline: UpdateTradelineDto,
  ): Promise<ResponseDTO> {
    return await this.tradelineService.update(id, tradeline);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Tradeline' })
  @ApiResponse({
    status: 200,
    description: 'The Tradeline has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.tradelineService.deleteOne({ id });
  }
}

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
import { EndTotalsService } from './end-totals.service';
import { CreateEndTotalsDto } from './dtos/create.end-totals.dto';
import { UpdateEndTotalsDto } from './dtos/update.end-totals.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('EndTotals')
@Controller('end-totals')
export class EndTotalsController {
  constructor(private readonly endTotalsService: EndTotalsService) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all EndTotalss' })
  @ApiResponse({ status: 200, description: 'Return all EndTotalss' })
  async getAll(): Promise<ResponseDTO> {
    return await this.endTotalsService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a EndTotals by id' })
  @ApiResponse({ status: 200, description: 'Return a EndTotals' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.endTotalsService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new EndTotals' })
  @ApiResponse({
    status: 201,
    description: 'The EndTotals has been successfully created.',
  })
  async create(@Body() endTotals: CreateEndTotalsDto): Promise<ResponseDTO> {
    return { data: await this.endTotalsService.create(endTotals) };
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a EndTotals' })
  @ApiResponse({
    status: 200,
    description: 'The EndTotals has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() endTotals: UpdateEndTotalsDto,
  ): Promise<ResponseDTO> {
    return await this.endTotalsService.update(id, endTotals);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a EndTotals' })
  @ApiResponse({
    status: 200,
    description: 'The EndTotals has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.endTotalsService.deleteOne({ id });
  }
}

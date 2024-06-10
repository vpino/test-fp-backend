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
import { ScoreFactorsService } from './score-factors.service';
import { CreateScoreFactorsDto } from './dtos/create.score-factors.dto';
import { UpdateScoreFactorsDto } from './dtos/update.score-factors.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('ScoreFactors')
@Controller('score-factors')
export class ScoreFactorsController {
  constructor(private readonly scoreFactorsService: ScoreFactorsService) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all ScoreFactorss' })
  @ApiResponse({ status: 200, description: 'Return all ScoreFactorss' })
  async getAll(): Promise<ResponseDTO> {
    return await this.scoreFactorsService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a ScoreFactors by id' })
  @ApiResponse({ status: 200, description: 'Return a ScoreFactors' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.scoreFactorsService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new ScoreFactors' })
  @ApiResponse({
    status: 201,
    description: 'The ScoreFactors has been successfully created.',
  })
  async create(
    @Body() scoreFactors: CreateScoreFactorsDto,
  ): Promise<ResponseDTO> {
    return { data: await this.scoreFactorsService.create(scoreFactors) };
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a ScoreFactors' })
  @ApiResponse({
    status: 200,
    description: 'The ScoreFactors has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() scoreFactors: UpdateScoreFactorsDto,
  ): Promise<ResponseDTO> {
    return await this.scoreFactorsService.update(id, scoreFactors);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ScoreFactors' })
  @ApiResponse({
    status: 200,
    description: 'The ScoreFactors has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.scoreFactorsService.deleteOne({ id });
  }
}

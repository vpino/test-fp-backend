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
import { HomeLoanService } from './home-loan.service';
import { CreateHomeLoanDto } from './dtos/create.home-loan.dto';
import { UpdateHomeLoanDto } from './dtos/update.home-loan.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('HomeLoan')
@Controller('home-loan')
export class HomeLoanController {
  constructor(private readonly homeLoanService: HomeLoanService) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all HomeLoans' })
  @ApiResponse({ status: 200, description: 'Return all HomeLoans' })
  async getAll(): Promise<ResponseDTO> {
    return await this.homeLoanService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a HomeLoan by id' })
  @ApiResponse({ status: 200, description: 'Return a HomeLoan' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.homeLoanService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new HomeLoan' })
  @ApiResponse({
    status: 201,
    description: 'The HomeLoan has been successfully created.',
  })
  async create(@Body() homeLoan: CreateHomeLoanDto): Promise<ResponseDTO> {
    return { data: await this.homeLoanService.create(homeLoan) };
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a HomeLoan' })
  @ApiResponse({
    status: 200,
    description: 'The HomeLoan has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() homeLoan: UpdateHomeLoanDto,
  ): Promise<ResponseDTO> {
    return await this.homeLoanService.update(id, homeLoan);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a HomeLoan' })
  @ApiResponse({
    status: 200,
    description: 'The HomeLoan has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.homeLoanService.deleteOne({ id });
  }
}

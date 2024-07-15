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
import { CreateExperianDto } from './dtos/create.experian.dto';
import { UpdateExperianDto } from './dtos/update.experian.dto';
import { TransactionCategoriserService } from './services/transaction-categoriser.service';
import { GetTransactionCategoriserDTO } from './dtos/transaction-categoriser/get-transaction-request.dto';
import { OpenBankingService } from './services/open-banking.service';
import { VerifyIncomeDTO } from './dtos/open-banking/verify-income.request.dto';
import { CreditScoreRequestDTO } from './dtos/open-banking/credit-score.dto';
import { AffordabilityCheckDTO } from './dtos/open-banking/affordability-check.dto';
import { ExperianService } from './experian.service';

@ApiBearerAuth('JWT-auth')
@ApiTags('Experian')
@Controller('tier-two')
export class ExperianController {
  constructor(
    private readonly experianService: ExperianService,
    private readonly transactionCategoriserService: TransactionCategoriserService,
    private readonly openBankingService: OpenBankingService
  ) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all Experians' })
  @ApiResponse({ status: 200, description: 'Return all Experians' })
  async getAll(): Promise<ResponseDTO> {
    return await this.experianService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a Experian by id' })
  @ApiResponse({ status: 200, description: 'Return a Experian' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.experianService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post('/transaction-categoriser')
  @ApiOperation({ summary: 'It classifies consumer financial transactions from a list of 134 pre-determined categories.' })
  @ApiResponse({
    status: 201,
    description: 'transaction categoriser',
  })
  async transactionCategoriser(
    @Body() data: GetTransactionCategoriserDTO,
  ): Promise<ResponseDTO> {
    return { data: await this.transactionCategoriserService.get(data) };
  }

  @SkipJwtAuth()
  @Post('/income-verifications')
  @ApiOperation({ summary: 'Verify income of the clients.' })
  @ApiResponse({
    status: 201,
    description: '',
  })
  async incomeVerifications(
    @Body() data: VerifyIncomeDTO,
  ): Promise<ResponseDTO> {
    return { data: await this.openBankingService.incomeVerifications(data) };
  }

  @SkipJwtAuth()
  @Post('/affordability-check')
  @ApiOperation({ summary: 'Checks if the customer can afford to make the payments.' })
  @ApiResponse({
    status: 201,
    description: '',
  })
  async abilityPay(
    @Body() data: AffordabilityCheckDTO,
  ): Promise<ResponseDTO> {
    return { data: await this.openBankingService.abilityPay(data) };
  }

  @SkipJwtAuth()
  @Post('/scores')
  @ApiOperation({ summary: 'Provides the score of the customer.' })
  @ApiResponse({
    status: 201,
    description: '',
  })
  async scores(
    @Body() data: CreditScoreRequestDTO,
  ): Promise<ResponseDTO> {
    return { data: await this.openBankingService.getCreditScore(data) };
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new Experian' })
  @ApiResponse({
    status: 201,
    description: 'The Experian has been successfully created.',
  })
  async create(@Body() Experian: CreateExperianDto): Promise<ResponseDTO> {
    return { data: await this.experianService.create(Experian) };
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a Experian' })
  @ApiResponse({
    status: 200,
    description: 'The Experian has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() Experian: UpdateExperianDto,
  ): Promise<ResponseDTO> {
    return await this.experianService.update(id, Experian);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Experian' })
  @ApiResponse({
    status: 200,
    description: 'The Experian has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.experianService.deleteOne({ id });
  }
}

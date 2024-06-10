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
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dtos/create.loan.dto';
import { SkipJwtAuth } from 'src/common/decorators/skip-guard.decorator';

@ApiBearerAuth('JWT-auth')
@ApiTags('Leads')
@Controller('leads')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get('/personal-loan')
  @ApiOperation({ summary: 'Get all loans' })
  @ApiResponse({ status: 200, description: 'Return all loans' })
  async getAll(): Promise<ResponseDTO> {
    return this.loanService.getAll({});
  }

  @Get('/personal-loan/:id')
  @ApiOperation({ summary: 'Get a loan by id' })
  @ApiResponse({ status: 200, description: 'Return a loan' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return this.loanService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post('/personal-loan')
  @ApiOperation({ summary: 'Create a new loan' })
  @ApiResponse({
    status: 201,
    description: 'The loan has been successfully created.',
  })
  async create(@Body() loanData: CreateLoanDto): Promise<ResponseDTO> {
    return { data: await this.loanService.generate(loanData) }
  }

  @Put('/personal-loan/:id')
  @ApiOperation({ summary: 'Update a loan' })
  @ApiResponse({
    status: 200,
    description: 'The loan has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() loanData: CreateLoanDto,
  ): Promise<ResponseDTO> {
    return this.loanService.update(id, loanData);
  }

  @Delete('/personal-loan/:id')
  @ApiOperation({ summary: 'Delete a loan' })
  @ApiResponse({
    status: 200,
    description: 'The loan has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return this.loanService.deleteOne({ _id: id });
  }
}

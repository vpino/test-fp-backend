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
import { LoanInformationService } from './loan-information.service';
import { CreateLoanInformationDto } from './dtos/create.loan-information.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Loan-Information')
@Controller('loan-information')
export class LoanInformationController {
  constructor(
    private readonly loanInformationService: LoanInformationService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all Loan Informations' })
  @ApiResponse({ status: 200, description: 'Return all Loan Informations' })
  async getAll(): Promise<ResponseDTO> {
    return this.loanInformationService.getAll({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Loan Information by id' })
  @ApiResponse({ status: 200, description: 'Return a LoanInformation' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return this.loanInformationService.findOne({ id });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Loan Information' })
  @ApiResponse({
    status: 201,
    description: 'The Loan Information has been successfully created.',
  })
  async create(
    @Body() LoanInformationData: CreateLoanInformationDto,
  ): Promise<ResponseDTO> {
    return { data: this.loanInformationService.create(LoanInformationData) };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a LoanInformation' })
  @ApiResponse({
    status: 200,
    description: 'The Loan Information has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() LoanInformationData: CreateLoanInformationDto,
  ): Promise<ResponseDTO> {
    return this.loanInformationService.update(id, LoanInformationData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a LoanInformation' })
  @ApiResponse({
    status: 200,
    description: 'The Loan Information has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return this.loanInformationService.deleteOne({ _id: id });
  }
}

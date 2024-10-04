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
import { PersonalLoanService } from './personal-loan.service';
import { CreatePersonalLoanDto } from './dtos/create.personal-loan.dto';
import { UpdatePersonalLoanDto } from './dtos/update.personal-loan.dto';
import { LoanDetailsMounthlyDto } from './dtos/loan-details-mounthly.dto';
import { UpdateTermsLoanDto } from './dtos/update.terms-loan.dto';
import { UpdateAssetsDto } from './dtos/update.assets.dto';
import { UpdateTermsAndConditionsDto } from './dtos/update.terms-and-conditions.dto';
import { ParamsDTO } from 'src/common/dtos';
import { PersonalLoan } from './entities/personal-loan.entity';
import { UpdateAcceptPersonalLoanDto } from './dtos/update.accept-personal-loan.dto';
import { UpdateInfoAfterRejectedDto } from './dtos/update.info-after-rejected.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('PersonalLoan')
@Controller('personal-loan')
export class PersonalLoanController {
  constructor(private readonly personalLoanService: PersonalLoanService) {}

  @Get()
  @ApiOperation({ summary: 'Get all PersonalLoans' })
  @ApiResponse({ status: 200, description: 'Return all PersonalLoans' })
  async getAll(): Promise<ResponseDTO> {
    return await this.personalLoanService.getAll({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a PersonalLoan by id' })
  @ApiResponse({ status: 200, description: 'Return a PersonalLoan' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.personalLoanService.findOne({ id });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new PersonalLoan' })
  @ApiResponse({
    status: 201,
    description: 'The PersonalLoan has been successfully created.',
  })
  async create(
    @Body() personalLoan: CreatePersonalLoanDto,
  ): Promise<ResponseDTO> {
    return { data: await this.personalLoanService.create(personalLoan) };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a PersonalLoan' })
  @ApiResponse({
    status: 200,
    description: 'The PersonalLoan has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() personalLoan: UpdatePersonalLoanDto,
  ): Promise<ResponseDTO> {
    return await this.personalLoanService.update(id, personalLoan);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a PersonalLoan' })
  @ApiResponse({
    status: 200,
    description: 'The PersonalLoan has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.personalLoanService.deleteOne({ id });
  }

  @Put(':customerId/details-mounthly')
  async loanDetailsMounthly(
    @Param('customerId') customerId: string,
    @Body() loanDetailsMounthlyDto: LoanDetailsMounthlyDto,
  ) {
    return this.personalLoanService.loanDetailsMounthly(
      customerId,
      loanDetailsMounthlyDto,
    );
  }

  @Put(':id/update-terms')
  async updateTermsLoan(
    @Param('id') id: string,
    @Body() updateTermsLoanDto: UpdateTermsLoanDto,
  ) {
    return this.personalLoanService.updateTermsLoan(id, updateTermsLoanDto);
  }

  @Put(':id/update-assets')
  async updateAssets(
    @Param('id') id: string,
    @Body() updateAssetsDto: UpdateAssetsDto,
  ) {
    return this.personalLoanService.updateAssets(id, updateAssetsDto);
  }

  @Put(':id/accept-tc')
  async updateTermsAndConditions(
    @Param('id') id: string,
    @Body() updateTermsAndConditionsDto: UpdateTermsAndConditionsDto,
  ) {
    return this.personalLoanService.updateTermsAndConditions(
      id,
      updateTermsAndConditionsDto,
    );
  }

  @Post('/get-all-by-customer')
  @ApiOperation({ summary: 'Get a PersonalLoan by id' })
  @ApiResponse({ status: 200, description: 'Return a PersonalLoan' })
  async getAllByCustomer(@Body() params: ParamsDTO<any>): Promise<ResponseDTO> {
    return await this.personalLoanService.getAll(params);
  }

  @Get(':id/get-last-created')
  @ApiOperation({ summary: 'Get the last created PersonalLoan by customer id' })
  @ApiResponse({
    status: 200,
    description: 'Return the last created PersonalLoan',
  })
  async getLastCreated(@Param('id') customerId: string): Promise<ResponseDTO> {
    return await this.personalLoanService.getLastCreated(customerId)
  }

  @Put(':id/accept-personal-loan')
  @ApiOperation({ summary: 'Accept personal loan' })
  @ApiResponse({
    status: 200,
    description: 'Accept personal loan',
    type: PersonalLoan,
  })
  @ApiResponse({ status: 404, description: 'Personal Loan not found.' })
  acceptHomeLoan(
    @Param('id') id: string,
    @Body() updateAcceptPersonalLoanDto: UpdateAcceptPersonalLoanDto,
  ) {
    return this.personalLoanService.updateAcceptPersonalLoan(
      id,
      updateAcceptPersonalLoanDto,
    );
  }

  @Put(':id/update-info-rejected')
  @ApiOperation({ summary: 'Update info after rejected' })
  @ApiResponse({
    status: 200,
    description: 'the personal loan updated successfully.',
    type: PersonalLoan,
  })
  @ApiResponse({ status: 404, description: 'Personal Loan not found.' })
  updateInfofterRejected(
    @Param('id') id: string,
    @Body() updateInfoAfterRejectedDto: UpdateInfoAfterRejectedDto,
  ) {
    return this.personalLoanService.updateInfoAfterRejected(
      id,
      updateInfoAfterRejectedDto,
    );
  }
}

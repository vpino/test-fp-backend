import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ResponseDTO } from '../../common/dtos/response.dto';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dtos/create.customer.dto';
import { kycRequirements } from './dtos/kyc.requirements.dto';
import { SkipJwtAuth } from 'src/common/decorators/skip-guard.decorator';
import { SubmitKycDto } from './dtos/submit.kyc.dto';
import { UpdateKycDto } from './dtos/update.kyc.dto';
import { LoadNamesDTO } from '../individual-customer/dtos/load-names.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all customer' })
  @ApiResponse({ status: 200, description: 'Return all customer' })
  async getAll(): Promise<ResponseDTO> {
    return await this.customerService.getAll({});
  }

  @SkipJwtAuth()
  @Get('/kycRequirements')
  @ApiOperation({
    summary: 'List KYC Requirements',
  })
  async getKycRequirements(
    @Query(new ValidationPipe({ transform: true }))
    kycRequirements: kycRequirements,
  ): Promise<ResponseDTO> {
    return await this.customerService.getKycRequirements(
      kycRequirements.country,
    );
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by id' })
  @ApiResponse({ status: 200, description: 'Return a customer' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.customerService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({
    status: 201,
    description: 'The customer has been successfully created.',
  })
  async create(@Body() Customer: CreateCustomerDto): Promise<ResponseDTO> {
    return await this.customerService.save(Customer);
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiResponse({
    status: 200,
    description: 'The customer has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() Customer: CreateCustomerDto,
  ): Promise<ResponseDTO> {
    return await this.customerService.update(id, Customer);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiResponse({
    status: 200,
    description: 'The customer has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.customerService.deleteOne({ _id: id });
  }

  @SkipJwtAuth()
  @ApiOperation({
    summary: 'Endpoint to submit required KYC information to liquidity partner',
  })
  @Post(':customerId/kyc')
  async submitKyc(
    @Body() body: SubmitKycDto,
    @Param('customerId') customerId: string,
  ): Promise<ResponseDTO> {
    return await this.customerService.submitKyc(body.kycSubmission, customerId);
  }

  @SkipJwtAuth()
  @ApiOperation({
    summary: 'Endpoint to update required KYC information to liquidity partner',
  })
  @Put(':customerId/kyc')
  async updateIndividualCustomer(
    @Body() body: UpdateKycDto,
    @Param('customerId') customerId: string,
  ): Promise<ResponseDTO> {
    try {
      return await this.customerService.updateKyc(
        body.kycUpdateSubmission,
        customerId,
        body.submissionId,
      );
    } catch (error) {
      return error;
    }
  }


  @Put(':id/load-names')
  @ApiOperation({ summary: 'Load Names for an individual customer' })
  @ApiResponse({
    status: 200,
    description: 'The names have been successfully loaded.',
  })
  async updateLoadNames(
    @Param('id') id: string,
    @Body() loadNamesDTO: LoadNamesDTO,
  ): Promise<ResponseDTO> {
    const data = await this.customerService.updateLoadNames(id, loadNamesDTO);
    return { data };
  }

}

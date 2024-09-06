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
import { HomeLoanService } from './home-loan.service';
import { CreateHomeLoanDto } from './dtos/create.home-loan.dto';
import { UpdateHomeLoanDto } from './dtos/update.home-loan.dto';
import { HomeLoan } from './entities/home-loan.entity';
import { UpdateHomeAssetsDto } from './dtos/update.assets.dto';
import { UpdatePaymentInitialDto } from './dtos/update.payment-initial.dto';
import { UpdatePriceHomeDto } from './dtos/update.price-home.dto';
import { PropertyUsageDto } from './dtos/update.property-usage.dto';
import { UpdateTermsAndConditionsDto } from './dtos/update.terms-and-conditions.dto';
import { TypeHomeDto } from './dtos/update.type-home.dto';
import { UpdateAddressHomeDto } from './dtos/update.address-home.dto';
import { UpdateHomeLoanMounthlyDetailsDto } from './dtos/update.home-mounthly-details.dto';
import { ParamsDTO } from 'src/common/dtos';

@ApiBearerAuth('JWT-auth')
@ApiTags('HomeLoan')
@Controller('home-loan')
export class HomeLoanController {
  constructor(private readonly homeLoanService: HomeLoanService) {}

  @Get()
  @ApiOperation({ summary: 'Get all HomeLoans' })
  @ApiResponse({ status: 200, description: 'Return all HomeLoans' })
  async getAll(): Promise<ResponseDTO> {
    return await this.homeLoanService.getAll({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a HomeLoan by id' })
  @ApiResponse({ status: 200, description: 'Return a HomeLoan' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.homeLoanService.findOne({ id });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new HomeLoan' })
  @ApiResponse({
    status: 201,
    description: 'The HomeLoan has been successfully created.',
  })
  async create(@Body() homeLoan: CreateHomeLoanDto): Promise<ResponseDTO> {
    return { data: await this.homeLoanService.create(homeLoan) };
  }

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

  @Put(':id/property-usage')
  @ApiOperation({ summary: 'Update property usage' })
  @ApiResponse({
    status: 200,
    description: 'Property usage updated successfully.',
    type: HomeLoan,
  })
  @ApiResponse({ status: 404, description: 'HomeLoan not found.' })
  updatePropertyUsage(
    @Param('id') customerId: string,
    @Body() propertyUsageDto: PropertyUsageDto,
  ) {
    return this.homeLoanService.updatePropertyUsage(
      customerId,
      propertyUsageDto,
    );
  }

  @Put(':id/type-home')
  @ApiOperation({ summary: 'Update type of home' })
  @ApiResponse({
    status: 200,
    description: 'Type of home updated successfully.',
    type: HomeLoan,
  })
  @ApiResponse({ status: 404, description: 'HomeLoan not found.' })
  updateTypeHome(@Param('id') id: string, @Body() typeHomeDto: TypeHomeDto) {
    return this.homeLoanService.updateTypeHome(id, typeHomeDto);
  }

  @Put(':id/address')
  @ApiOperation({ summary: 'Update address of a home loan' })
  @ApiResponse({
    status: 200,
    description: 'Address updated successfully.',
    type: HomeLoan,
  })
  @ApiResponse({ status: 404, description: 'HomeLoan not found.' })
  updateAddress(
    @Param('id') id: string,
    @Body() updateAddressHomeDto: UpdateAddressHomeDto,
  ) {
    return this.homeLoanService.updateAddress(id, updateAddressHomeDto);
  }

  @Put(':id/price-home')
  @ApiOperation({ summary: 'Update price of the home' })
  @ApiResponse({
    status: 200,
    description: 'Price of the home updated successfully.',
    type: HomeLoan,
  })
  @ApiResponse({ status: 404, description: 'HomeLoan not found.' })
  updatePriceHome(
    @Param('id') id: string,
    @Body() updatePriceHomeDto: UpdatePriceHomeDto,
  ) {
    return this.homeLoanService.updatePriceHome(id, updatePriceHomeDto);
  }

  @Put(':id/payment-initial')
  @ApiOperation({ summary: 'Update payment initial of a home loan' })
  @ApiResponse({
    status: 200,
    description: 'Payment initial updated successfully.',
    type: HomeLoan,
  })
  @ApiResponse({ status: 404, description: 'HomeLoan not found.' })
  updatePaymentInitial(
    @Param('id') id: string,
    @Body() updatePaymentInitialDto: UpdatePaymentInitialDto,
  ) {
    return this.homeLoanService.updatePaymentInitial(
      id,
      updatePaymentInitialDto,
    );
  }

  @Put(':id/mounthly-details')
  @ApiOperation({ summary: 'Update monthly details of a home loan' })
  @ApiResponse({
    status: 200,
    description: 'Monthly details updated successfully.',
    type: HomeLoan,
  })
  @ApiResponse({ status: 404, description: 'HomeLoan not found.' })
  updateMounthlyDetails(
    @Param('id') id: string,
    @Body() updateMounthlyDetailsDto: UpdateHomeLoanMounthlyDetailsDto,
  ) {
    return this.homeLoanService.updateMounthlyDetails(
      id,
      updateMounthlyDetailsDto,
    );
  }

  @Put(':id/assets')
  @ApiOperation({ summary: 'Update assets of a home loan' })
  @ApiResponse({
    status: 200,
    description: 'Assets updated successfully.',
    type: HomeLoan,
  })
  @ApiResponse({ status: 404, description: 'HomeLoan not found.' })
  updateAssets(
    @Param('id') id: string,
    @Body() updateHomeAssetsDto: UpdateHomeAssetsDto,
  ) {
    return this.homeLoanService.updateAssets(id, updateHomeAssetsDto);
  }

  @Put(':id/terms-and-conditions')
  @ApiOperation({ summary: 'Update terms and conditions acceptance' })
  @ApiResponse({
    status: 200,
    description: 'Terms and conditions acceptance updated successfully.',
    type: HomeLoan,
  })
  @ApiResponse({ status: 404, description: 'HomeLoan not found.' })
  updateTermsAndConditions(
    @Param('id') id: string,
    @Body() updateTermsAndConditionsDto: UpdateTermsAndConditionsDto,
  ) {
    return this.homeLoanService.updateTermsAndConditions(
      id,
      updateTermsAndConditionsDto,
    );
  }

  @Post('/get-all-by-customer')
  @ApiOperation({ summary: 'Get a Home Loan by id' })
  @ApiResponse({ status: 200, description: 'Return a Home Loan' })
  async getAllByCustomer(@Body() params: ParamsDTO<any>): Promise<ResponseDTO> {
    return await this.homeLoanService.getAll(params);
  }

  @Get(':id/get-last-created')
  @ApiOperation({ summary: 'Get the last created HomeLoan by customer id' })
  @ApiResponse({
    status: 200,
    description: 'Return the last created HomeLoan',
  })
  async getLastCreated(@Param('id') customerId: string): Promise<ResponseDTO> {
    return await this.homeLoanService.findOne({
      customer: { id: customerId },
    });
  }
}

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
import { IndividualCustomerService } from './individual-customer.service';
import { CreateIndividualCustomerDto } from './dtos/create.individual-customer.dto';
import { SkipJwtAuth } from 'src/common/decorators/skip-guard.decorator';
import { IdentityDocumentDTO } from './dtos/identity-document.dto';
import { AddressDTO } from './dtos/address.dto';
import { HousingDataDTO } from './dtos/housing-data.dto';
import { EducationDataDTO } from './dtos/education-data.dto';
import { OccupationDTO } from './dtos/occupation.dto';
import { CompanyInfoDTO } from './dtos/company-info.dto';
import { ContactInfoDTO } from './dtos/contact-info.dto';
import { UpdateIndividualCustomerDto } from './dtos/update.individual-customer.dto';

@SkipJwtAuth()
@ApiBearerAuth('JWT-auth')
@ApiTags('Individual Customer')
@Controller('individual-customer')
export class IndividualCustomerController {
  constructor(
    private readonly individualCustomerService: IndividualCustomerService,
  ) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all individual customer' })
  @ApiResponse({ status: 200, description: 'Return all individual customer' })
  async getAll(): Promise<ResponseDTO> {
    return this.individualCustomerService.getAll({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a individual customer by id' })
  @ApiResponse({ status: 200, description: 'Return a customer' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return this.individualCustomerService.findOne({ id });
  }

  @Get('customer/:id')
  @ApiOperation({ summary: 'Get a individual by customerId' })
  @ApiResponse({ status: 200, description: 'Return a customer' })
  async getIndividualByCustomerId(
    @Param('id') customerId: string,
  ): Promise<ResponseDTO> {
    return this.individualCustomerService.findOne({ customerId });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new individual customer' })
  @ApiResponse({
    status: 201,
    description: 'The individual customer has been successfully created.',
  })
  async create(
    @Body() individualCustomer: CreateIndividualCustomerDto,
  ): Promise<ResponseDTO> {
    return { data: this.individualCustomerService.create(individualCustomer) };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a individual customer' })
  @ApiResponse({
    status: 200,
    description: 'The individual customer has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() individualCustomer: UpdateIndividualCustomerDto,
  ): Promise<ResponseDTO> {
    return this.individualCustomerService.update(id, individualCustomer);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a individual customer' })
  @ApiResponse({
    status: 200,
    description: 'The individual customer has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return this.individualCustomerService.deleteOne({ _id: id });
  }

  @Put(':id/identity-document')
  @ApiOperation({
    summary: 'Load Identity Document for an individual customer',
  })
  @ApiResponse({
    status: 200,
    description: 'The identity document has been successfully loaded.',
  })
  async updateIdentityDocument(
    @Param('id') id: string,
    @Body() identityDocumentDTO: IdentityDocumentDTO,
  ): Promise<ResponseDTO> {
    const data = await this.individualCustomerService.updateIdentityDocument(
      id,
      identityDocumentDTO,
    );
    return { data };
  }

  @Put(':id/address')
  @ApiOperation({ summary: 'Load Address for an individual customer' })
  @ApiResponse({
    status: 200,
    description: 'The address has been successfully loaded.',
  })
  async updateAddress(
    @Param('id') id: string,
    @Body() addressDTO: AddressDTO,
  ): Promise<ResponseDTO> {
    const data = await this.individualCustomerService.updateAddress(
      id,
      addressDTO,
    );
    return { data };
  }

  @Put(':id/housing-data')
  @ApiOperation({ summary: 'Load Housing Data for an individual customer' })
  @ApiResponse({
    status: 200,
    description: 'The housing data has been successfully loaded.',
  })
  async updateHousingData(
    @Param('id') id: string,
    @Body() housingDataDTO: HousingDataDTO,
  ): Promise<ResponseDTO> {
    const data = await this.individualCustomerService.updateHousingData(
      id,
      housingDataDTO,
    );
    return { data };
  }

  @Put(':id/education-data')
  @ApiOperation({ summary: 'Load Education Data for an individual customer' })
  @ApiResponse({
    status: 200,
    description: 'The education data has been successfully loaded.',
  })
  async updateEducationData(
    @Param('id') id: string,
    @Body() educationDataDTO: EducationDataDTO,
  ): Promise<ResponseDTO> {
    const data = await this.individualCustomerService.updateEducationData(
      id,
      educationDataDTO,
    );
    return { data };
  }

  @Put(':id/occupation')
  @ApiOperation({ summary: 'Load Occupation Data for an individual customer' })
  @ApiResponse({
    status: 200,
    description: 'The occupation data has been successfully loaded.',
  })
  async updateOccupation(
    @Param('id') id: string,
    @Body() occupationDTO: OccupationDTO,
  ): Promise<ResponseDTO> {
    const data = await this.individualCustomerService.updateOccupation(
      id,
      occupationDTO,
    );
    return { data };
  }

  @Put(':id/company-info')
  @ApiOperation({ summary: 'Load Company Info for an individual customer' })
  @ApiResponse({
    status: 200,
    description: 'The company info has been successfully loaded.',
  })
  async updateCompanyInfo(
    @Param('id') id: string,
    @Body() companyInfoDTO: CompanyInfoDTO,
  ): Promise<ResponseDTO> {
    const data = await this.individualCustomerService.updateCompanyInfo(
      id,
      companyInfoDTO,
    );
    return { data };
  }

  @Put(':id/contact-info')
  @ApiOperation({ summary: 'Load Contact Info for an individual customer' })
  @ApiResponse({
    status: 200,
    description: 'The contact info has been successfully loaded.',
  })
  async updateContactInfo(
    @Param('id') id: string,
    @Body() contactInfoDTO: ContactInfoDTO,
  ): Promise<ResponseDTO> {
    const data = await this.individualCustomerService.updateContactInfo(
      id,
      contactInfoDTO,
    );
    return { data };
  }
}

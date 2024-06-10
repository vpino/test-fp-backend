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
    @Body() individualCustomer: CreateIndividualCustomerDto,
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
}

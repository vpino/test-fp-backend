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
import { CreditInformationService } from './credit-information.service';
import { CreateCreditInformationDto } from './dtos/create.credit-information.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Credit-Information')
@Controller('credit-information')
export class CreditInformationController {
  constructor(
    private readonly creditInformationService: CreditInformationService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all Credit Informations' })
  @ApiResponse({ status: 200, description: 'Return all Credit Informations' })
  async getAll(): Promise<ResponseDTO> {
    return this.creditInformationService.getAll({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Credit Information by id' })
  @ApiResponse({ status: 200, description: 'Return a CreditInformation' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return this.creditInformationService.findOne({ id });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new CreditInformation' })
  @ApiResponse({
    status: 201,
    description: 'The Credit Information has been successfully created.',
  })
  async create(
    @Body() creditInformationData: CreateCreditInformationDto,
  ): Promise<ResponseDTO> {
    return {
      data: this.creditInformationService.create(creditInformationData),
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a CreditInformation' })
  @ApiResponse({
    status: 200,
    description: 'The Credit Information has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() creditInformationData: CreateCreditInformationDto,
  ): Promise<ResponseDTO> {
    return this.creditInformationService.update(id, creditInformationData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Credit Information' })
  @ApiResponse({
    status: 200,
    description: 'The Credit Information has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return this.creditInformationService.deleteOne({ _id: id });
  }
}

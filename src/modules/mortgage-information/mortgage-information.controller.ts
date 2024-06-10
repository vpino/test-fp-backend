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
import { CreateMortgageInformationDto } from './dtos/create.mortgage-information.dto';
import { MortgageInformationService } from './mortgage-information.service';

@ApiBearerAuth('JWT-auth')
@ApiTags('Mortgage-Information')
@Controller('mortgage-information')
export class MortgageInformationController {
  constructor(private readonly mortgageInformationService: MortgageInformationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Mortgage Informations' })
  @ApiResponse({ status: 200, description: 'Return all Mortgage Informations' })
  async getAll(): Promise<ResponseDTO> {
    return this.mortgageInformationService.getAll({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Mortgage Information by id' })
  @ApiResponse({ status: 200, description: 'Return a Mortgage Information' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return this.mortgageInformationService.findOne({ id });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Mortgage Information' })
  @ApiResponse({
    status: 201,
    description: 'The Mortgage Information has been successfully created.',
  })
  async create(@Body() mortgageInformationData: CreateMortgageInformationDto): Promise<ResponseDTO> {
    return { data: this.mortgageInformationService.create(mortgageInformationData) }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Mortgage Information' })
  @ApiResponse({
    status: 200,
    description: 'The Mortgage Information has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() mortgageInformationData: CreateMortgageInformationDto,
  ): Promise<ResponseDTO> {
    return this.mortgageInformationService.update(id, mortgageInformationData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Mortgage Information' })
  @ApiResponse({
    status: 200,
    description: 'The Mortgage Information has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return this.mortgageInformationService.deleteOne({ _id: id });
  }
}

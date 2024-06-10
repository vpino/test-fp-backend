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
import { LegalInformationService } from './legal-information.service';
import { CreateLegalInformationDto } from './dtos/create.legal-information.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Legal-Information')
@Controller('legal-information')
export class LegalInformationController {
  constructor(
    private readonly legalInformationService: LegalInformationService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all Legal Information' })
  @ApiResponse({ status: 200, description: 'Return all Legal Information' })
  async getAll(): Promise<ResponseDTO> {
    return this.legalInformationService.getAll({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Legal Information by id' })
  @ApiResponse({ status: 200, description: 'Return a Legal Information' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return this.legalInformationService.findOne({ id });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Legal Information' })
  @ApiResponse({
    status: 201,
    description: 'The Legal Information has been successfully created.',
  })
  async create(
    @Body() legalInformationData: CreateLegalInformationDto,
  ): Promise<ResponseDTO> {
    return { data: this.legalInformationService.create(legalInformationData) };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Legal Information' })
  @ApiResponse({
    status: 200,
    description: 'The Legal Information has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() legalInformationData: CreateLegalInformationDto,
  ): Promise<ResponseDTO> {
    return this.legalInformationService.update(id, legalInformationData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Legal Information' })
  @ApiResponse({
    status: 200,
    description: 'The Legal Information has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return this.legalInformationService.deleteOne({ _id: id });
  }
}

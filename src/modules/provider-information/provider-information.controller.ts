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
import { SkipJwtAuth } from 'src/common/decorators/skip-guard.decorator';
import { ProviderInformationService } from './provider-information.service';
import { CreateProviderInformationDto } from './dtos/create.provider-information.dto';
import { UpdateProviderInformationDto } from './dtos/update.provider-information.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Provider Information')
@Controller('provider-information')
export class ProviderInformationController {
  constructor(
    private readonly providerInformationService: ProviderInformationService,
  ) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all Provider Information' })
  @ApiResponse({ status: 200, description: 'Return all Provider Information' })
  async getAll(): Promise<ResponseDTO> {
    return await this.providerInformationService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a Provider Information by id' })
  @ApiResponse({ status: 200, description: 'Return a Provider Information' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.providerInformationService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new Provider Information' })
  @ApiResponse({
    status: 201,
    description: 'The Provider Information has been successfully created.',
  })
  async create(
    @Body() providerInformation: CreateProviderInformationDto,
  ): Promise<ResponseDTO> {
    return {
      data: await this.providerInformationService.create(providerInformation),
    };
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a Provider Information' })
  @ApiResponse({
    status: 200,
    description: 'The Provider Information has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() providerInformation: UpdateProviderInformationDto,
  ): Promise<ResponseDTO> {
    return await this.providerInformationService.update(
      id,
      providerInformation,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Provider Information' })
  @ApiResponse({
    status: 200,
    description: 'The Provider Information has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.providerInformationService.deleteOne({ _id: id });
  }
}

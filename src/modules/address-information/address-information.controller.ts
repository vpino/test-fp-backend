import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ResponseDTO } from '../../common/dtos/response.dto';
import { SkipJwtAuth } from 'src/common/decorators/skip-guard.decorator';
import { CreateAddressInformationDto } from './dtos/create.address-information.dto';
import { UpdateAddressInformationDto } from './dtos/update.address-information.dto';
import { AddressInformationService } from './address-information.service';

@ApiBearerAuth('JWT-auth')
@ApiTags('Address Information')
@Controller('address-information')
export class AddressInformationController {
  constructor(private readonly addressInformationService : AddressInformationService) { }

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all Address Information' })
  @ApiResponse({ status: 200, description: 'Return all Address Information' })
  async getAll(): Promise<ResponseDTO> {
    return await this.addressInformationService .getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a Address Information by id' })
  @ApiResponse({ status: 200, description: 'Return a Address Information' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.addressInformationService .findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new Address Information' })
  @ApiResponse({
    status: 201,
    description: 'The Address Information has been successfully created.',
  })
  async create(@Body() addressInformation: CreateAddressInformationDto): Promise<ResponseDTO> {
    return { data: await this.addressInformationService .create(addressInformation ) }
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a Address Information' })
  @ApiResponse({
    status: 200,
    description: 'The Address Information has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() addressInformation: UpdateAddressInformationDto,
  ): Promise<ResponseDTO> {
    return await this.addressInformationService .update(id, addressInformation );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Address Information' })
  @ApiResponse({
    status: 200,
    description: 'The Address Information has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.addressInformationService .deleteOne({ _id: id });
  }

}

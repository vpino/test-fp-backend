
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
import { EmploymentInformationService } from './employment-information.service';
import { CreateEmploymentInformationDto } from './dtos/create.employment-information.dto';
import { UpdateEmploymentInformationDto } from './dtos/update.employment-information.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('EmploymentInformation')
@Controller('employment-information')
export class EmploymentInformationController {
  constructor(private readonly employmentInformationService: EmploymentInformationService) { }

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all EmploymentInformations' })
  @ApiResponse({ status: 200, description: 'Return all EmploymentInformations' })
  async getAll(): Promise<ResponseDTO> {
    return await this.employmentInformationService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a EmploymentInformation by id' })
  @ApiResponse({ status: 200, description: 'Return a EmploymentInformation' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.employmentInformationService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new EmploymentInformation' })
  @ApiResponse({
    status: 201,
    description: 'The EmploymentInformation has been successfully created.',
  })
  async create(@Body() employmentInformation: CreateEmploymentInformationDto): Promise<ResponseDTO> {
    return { data: await this.employmentInformationService.create(employmentInformation) }
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a EmploymentInformation' })
  @ApiResponse({
    status: 200,
    description: 'The EmploymentInformation has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() employmentInformation: UpdateEmploymentInformationDto,
  ): Promise<ResponseDTO> {
    return await this.employmentInformationService.update(id, employmentInformation);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a EmploymentInformation' })
  @ApiResponse({
    status: 200,
    description: 'The EmploymentInformation has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.employmentInformationService.deleteOne({ id });
  }
}

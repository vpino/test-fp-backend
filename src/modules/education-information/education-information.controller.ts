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
import { CreateEducationInformationDto } from './dtos/create.education-information.dto';
import { EducationInformationService } from './education-information.service';

@ApiBearerAuth('JWT-auth')
@ApiTags('Education-Information')
@Controller('education-information')
export class EducationInformationController {
  constructor(private readonly educationInformationService: EducationInformationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Education Information' })
  @ApiResponse({ status: 200, description: 'Return all Education Information' })
  async getAll(): Promise<ResponseDTO> {
    return this.educationInformationService.getAll({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Education Information by id' })
  @ApiResponse({ status: 200, description: 'Return a EducationInformation' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return this.educationInformationService.findOne({ id });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Education Information' })
  @ApiResponse({
    status: 201,
    description: 'The Education Information has been successfully created.',
  })
  async create(@Body() educationInformationData: CreateEducationInformationDto): Promise<ResponseDTO> {
    return { data: this.educationInformationService.create(educationInformationData) }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Education Information' })
  @ApiResponse({
    status: 200,
    description: 'The Education Information has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() educationInformationData: CreateEducationInformationDto,
  ): Promise<ResponseDTO> {
    return this.educationInformationService.update(id, educationInformationData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Education Information' })
  @ApiResponse({
    status: 200,
    description: 'The Education Information has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return this.educationInformationService.deleteOne({ _id: id });
  }
}

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
import { InformationalMessageService } from './informational-message.service';
import { CreateInformationalMessageDto } from './dtos/create.informational-message.dto';
import { UpdateInformationalMessageDto } from './dtos/update.informational-message.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('InformationalMessage')
@Controller('informational-message')
export class InformationalMessageController {
  constructor(
    private readonly informationalMessageService: InformationalMessageService,
  ) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all InformationalMessages' })
  @ApiResponse({ status: 200, description: 'Return all InformationalMessages' })
  async getAll(): Promise<ResponseDTO> {
    return await this.informationalMessageService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a InformationalMessage by id' })
  @ApiResponse({ status: 200, description: 'Return a InformationalMessage' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.informationalMessageService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new InformationalMessage' })
  @ApiResponse({
    status: 201,
    description: 'The InformationalMessage has been successfully created.',
  })
  async create(
    @Body() informationalMessage: CreateInformationalMessageDto,
  ): Promise<ResponseDTO> {
    return {
      data: await this.informationalMessageService.create(informationalMessage),
    };
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a InformationalMessage' })
  @ApiResponse({
    status: 200,
    description: 'The InformationalMessage has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() informationalMessage: UpdateInformationalMessageDto,
  ): Promise<ResponseDTO> {
    return await this.informationalMessageService.update(
      id,
      informationalMessage,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a InformationalMessage' })
  @ApiResponse({
    status: 200,
    description: 'The InformationalMessage has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.informationalMessageService.deleteOne({ id });
  }
}

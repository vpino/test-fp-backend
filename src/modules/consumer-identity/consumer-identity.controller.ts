
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
import { ConsumerIdentityService } from './consumer-identity.service';
import { CreateConsumerIdentityDto } from './dtos/create.consumer-identity.dto';
import { UpdateConsumerIdentityDto } from './dtos/update.consumer-identity.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('ConsumerIdentity')
@Controller('consumer-identity')
export class ConsumerIdentityController {
  constructor(private readonly consumerIdentityService: ConsumerIdentityService) { }

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all ConsumerIdentitys' })
  @ApiResponse({ status: 200, description: 'Return all ConsumerIdentitys' })
  async getAll(): Promise<ResponseDTO> {
    return await this.consumerIdentityService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a ConsumerIdentity by id' })
  @ApiResponse({ status: 200, description: 'Return a ConsumerIdentity' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.consumerIdentityService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new ConsumerIdentity' })
  @ApiResponse({
    status: 201,
    description: 'The ConsumerIdentity has been successfully created.',
  })
  async create(@Body() consumerIdentity: CreateConsumerIdentityDto): Promise<ResponseDTO> {
    return { data: await this.consumerIdentityService.create(consumerIdentity) }
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a ConsumerIdentity' })
  @ApiResponse({
    status: 200,
    description: 'The ConsumerIdentity has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() consumerIdentity: UpdateConsumerIdentityDto,
  ): Promise<ResponseDTO> {
    return await this.consumerIdentityService.update(id, consumerIdentity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ConsumerIdentity' })
  @ApiResponse({
    status: 200,
    description: 'The ConsumerIdentity has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.consumerIdentityService.deleteOne({ id });
  }
}

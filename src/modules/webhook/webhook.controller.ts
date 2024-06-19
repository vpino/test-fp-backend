
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
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dtos/create.webhook.dto';
import { UpdateWebhookDto } from './dtos/update.webhook.dto';
import { EventDto } from './dtos/event.webhook.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Webhook')
@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) { }

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all Webhooks' })
  @ApiResponse({ status: 200, description: 'Return all Webhooks' })
  async getAll(): Promise<ResponseDTO> {
    return await this.webhookService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a Webhook by id' })
  @ApiResponse({ status: 200, description: 'Return a Webhook' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.webhookService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new Webhook' })
  @ApiResponse({
    status: 201,
    description: 'The Webhook has been successfully created.',
  })
  async create(@Body() webhook: CreateWebhookDto): Promise<ResponseDTO> {
    return { data: await this.webhookService.create(webhook) }
  }

  @SkipJwtAuth()
  @Post('/status/kyc')
  @ApiOperation({ summary: 'Create a new Webhook kyc' })
  @ApiResponse({
    status: 201,
    description: 'The Webhook has been successfully created.',
  })
  async kyc(@Body() webhook: EventDto): Promise<ResponseDTO> {
    return { data: await this.webhookService.generate(webhook) }
  }

  @SkipJwtAuth()
  @Post('/status/repayment')
  @ApiOperation({ summary: 'Create a new Webhook repayment' })
  @ApiResponse({
    status: 201,
    description: 'The Webhook has been successfully created.',
  })
  async repayment(@Body() webhook: EventDto): Promise<ResponseDTO> {
    return { data: await this.webhookService.generate(webhook) }
  }

  @SkipJwtAuth()
  @Post('/status/loan')
  @ApiOperation({ summary: 'Create a new Webhook loan' })
  @ApiResponse({
    status: 201,
    description: 'The Webhook has been successfully created.',
  })
  async loan(@Body() webhook: EventDto): Promise<ResponseDTO> {
    return { data: await this.webhookService.generate(webhook) }
  }


  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a Webhook' })
  @ApiResponse({
    status: 200,
    description: 'The Webhook has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() webhook: UpdateWebhookDto,
  ): Promise<ResponseDTO> {
    return await this.webhookService.update(id, webhook);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Webhook' })
  @ApiResponse({
    status: 200,
    description: 'The Webhook has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.webhookService.deleteOne({ id });
  }
}

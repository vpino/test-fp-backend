
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Webhook } from './entities/webhook.entity';
import { EventDto } from './dtos/event.webhook.dto';

@Injectable()
export class WebhookService extends CrudService<Webhook> {
  constructor(
    @InjectRepository(Webhook) private webhookRepository: Repository<Webhook>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(webhookRepository, 'id', dataSourceInject);
  }

  async generate(event: EventDto) {
    return { message: "success" }
  }
}

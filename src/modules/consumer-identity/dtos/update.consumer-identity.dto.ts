import { PartialType } from '@nestjs/swagger';
import { CreateConsumerIdentityDto } from './create.consumer-identity.dto';

export class UpdateConsumerIdentityDto extends PartialType(
  CreateConsumerIdentityDto,
) {}

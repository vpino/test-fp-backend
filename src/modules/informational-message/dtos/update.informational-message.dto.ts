import { PartialType } from '@nestjs/swagger';
import { CreateInformationalMessageDto } from './create.informational-message.dto';

export class UpdateInformationalMessageDto extends PartialType(
  CreateInformationalMessageDto,
) {}

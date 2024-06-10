import { PartialType } from '@nestjs/swagger';
import { CreateTradelineDto } from './create.tradeline.dto';

export class UpdateTradelineDto extends PartialType(CreateTradelineDto) {}

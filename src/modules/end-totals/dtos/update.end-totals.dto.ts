import { PartialType } from '@nestjs/swagger';
import { CreateEndTotalsDto } from './create.end-totals.dto';

export class UpdateEndTotalsDto extends PartialType(CreateEndTotalsDto) {}

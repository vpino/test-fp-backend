import { PartialType } from '@nestjs/swagger';
import { CreateRiskModelDto } from './create.risk-model.dto';

export class UpdateRiskModelDto extends PartialType(CreateRiskModelDto) {}
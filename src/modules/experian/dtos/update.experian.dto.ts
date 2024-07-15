import { PartialType } from '@nestjs/swagger';
import { CreateExperianDto } from './create.experian.dto';

export class UpdateExperianDto extends PartialType(CreateExperianDto) {}

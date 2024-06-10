import { PartialType } from '@nestjs/swagger';
import { CreateScoreFactorsDto } from './create.score-factors.dto';

export class UpdateScoreFactorsDto extends PartialType(CreateScoreFactorsDto) {}
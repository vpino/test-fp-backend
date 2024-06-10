import { PartialType } from '@nestjs/swagger';
import { CreateUserRiskDto } from './create.user-risk.dto';

export class UpdateUserRiskDto extends PartialType(CreateUserRiskDto) {}

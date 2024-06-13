import { PartialType } from '@nestjs/swagger';
import { CreateAmortizationSettingsDto } from './create.amortization-settings.dto';

export class UpdateAmortizationSettingsDto extends PartialType(CreateAmortizationSettingsDto) {}
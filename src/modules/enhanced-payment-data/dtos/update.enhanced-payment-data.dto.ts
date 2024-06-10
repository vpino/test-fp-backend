import { PartialType } from '@nestjs/swagger';
import { CreateEnhancedPaymentDataDto } from './create.enhanced-payment-data.dto';

export class UpdateEnhancedPaymentDataDto extends PartialType(
  CreateEnhancedPaymentDataDto,
) {}

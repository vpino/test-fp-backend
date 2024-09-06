import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdatePaymentInitialDto {
  @ApiProperty()
  @IsNumber()
  paymentInitial: string;
}

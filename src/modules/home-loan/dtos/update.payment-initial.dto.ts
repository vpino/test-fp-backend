import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePaymentInitialDto {
  @ApiProperty()
  @IsString()
  percentageInitial: string;

  @ApiProperty()
  @IsNumber()
  paymentInitial: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateInfoAfterRejectedDto {
  @ApiProperty()
  @IsNumber()
  priceHome: number;

  @ApiProperty()
  @IsNumber()
  paymentInitial: number;
}

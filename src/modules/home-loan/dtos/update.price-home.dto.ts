import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdatePriceHomeDto {
  @ApiProperty()
  @IsNumber()
  priceHome: number;
}

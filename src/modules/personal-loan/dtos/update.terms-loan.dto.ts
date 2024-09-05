import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateTermsLoanDto {
  @ApiProperty({
    description: 'The amount of the loan',
    example: 10000,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'The duration of the loan',
    example: '12 months',
    required: false,
  })
  @IsString()
  duration: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateHomeLoanMounthlyDetailsDto {
  @ApiProperty()
  @IsString()
  monthlyIncome: string;

  @ApiProperty()
  @IsString()
  monthlyDebt: string;
}

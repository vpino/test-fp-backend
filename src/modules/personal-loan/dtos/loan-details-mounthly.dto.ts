import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class LoanDetailsMounthlyDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  monthlyIncome: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  monthlyBills: string;
}

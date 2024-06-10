import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsNumber } from 'class-validator';

export class CreateFinancialInformationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsString()
  employmentStatus: string;

  @ApiProperty()
  @IsString()
  employmentPayFrequency: string;

  @ApiProperty()
  @IsNumber()
  annualIncome: number;
}

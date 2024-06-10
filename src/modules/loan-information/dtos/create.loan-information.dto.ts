import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsNumber } from 'class-validator';

export class CreateLoanInformationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsString()
  purpose: string;

  @ApiProperty()
  @IsNumber()
  loanAmount: number;
}

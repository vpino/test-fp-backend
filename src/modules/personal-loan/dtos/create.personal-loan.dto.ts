import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsString,
  IsNumber,
  ArrayNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreatePersonalLoanDto {
  @ApiProperty()
  @IsUUID()
  customerId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  monthlyIncome: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  monthlyBills: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  duration: string;

  @ApiProperty()
  @ArrayNotEmpty()
  @IsOptional()
  assets: string[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  assetsAmount: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  tc: boolean;
}

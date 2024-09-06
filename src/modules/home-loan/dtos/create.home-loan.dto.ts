import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsNumber, ArrayNotEmpty } from 'class-validator';

export class CreateHomeLoanDto {
  @ApiProperty()
  @IsString()
  propertyUsage: string;

  @ApiProperty()
  @IsString()
  typeHouse: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  town: string;

  @ApiProperty()
  @IsNumber()
  priceHome: number;

  @ApiProperty()
  @IsString()
  paymentInitial: string;

  @ApiProperty()
  @IsNumber()
  monthlyIncome: number;

  @ApiProperty()
  @IsNumber()
  monthlyDebt: number;

  @ApiProperty()
  @ArrayNotEmpty()
  assets: string[];

  @ApiProperty()
  @IsNumber()
  assetsAmount: number;

  @ApiProperty()
  @IsBoolean()
  tc: boolean;
}

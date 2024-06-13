import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsNumber,
  IsDate,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateAmortizationSettingsDto {
  @ApiProperty()
  @IsString()
  amortizationProfile: string;

  @ApiProperty()
  @IsString()
  encodedKey: string;

  @ApiProperty()
  @IsString()
  feeAmortizationUponRescheduleRefinanceOption: string;

  @ApiProperty()
  @IsString()
  frequency: string;

  @ApiProperty()
  @IsNumber()
  intervalCount: number;

  @ApiProperty()
  @IsString()
  intervalType: string;

  @ApiProperty()
  @IsNumber()
  periodCount: number;

  @ApiProperty()
  @IsString()
  periodUnit: string;
}

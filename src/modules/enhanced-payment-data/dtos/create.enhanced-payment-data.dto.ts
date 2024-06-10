import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsNumber,
  IsDate,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateEnhancedPaymentDataDto {
  @ApiProperty()
  @IsString()
  enhancedAccountCondition: string;

  @ApiProperty()
  @IsString()
  enhancedAccountType: string;

  @ApiProperty()
  @IsString()
  enhancedPaymentHistory84: string;

  @ApiProperty()
  @IsString()
  enhancedPaymentStatus: string;

  @ApiProperty()
  @IsString()
  enhancedSpecialComment: string;

  @ApiProperty()
  @IsString()
  enhancedTerms: string;

  @ApiProperty()
  @IsString()
  enhancedTermsFrequency: string;

  @ApiProperty()
  @IsString()
  originalLoanAmount: string;

  @ApiProperty()
  @IsString()
  paymentLevelDate: string;
}

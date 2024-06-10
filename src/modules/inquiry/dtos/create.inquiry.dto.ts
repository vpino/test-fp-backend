import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsNumber,
  IsDate,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateInquiryDto {
  @ApiProperty()
  @IsString()
  amount: string;

  @ApiProperty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsString()
  subscriberCode: string;

  @ApiProperty()
  @IsString()
  subscriberName: string;

  @ApiProperty()
  @IsString()
  terms: string;

  @ApiProperty()
  @IsString()
  type: string;
}

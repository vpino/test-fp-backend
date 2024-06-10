import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsNumber,
  IsDate,
  ArrayNotEmpty,
} from 'class-validator';

export class CreatePublicRecordDto {
  @ApiProperty()
  @IsString()
  courtCode: string;

  @ApiProperty()
  @IsString()
  courtName: string;

  @ApiProperty()
  @IsString()
  ecoa: string;

  @ApiProperty()
  @IsString()
  evaluation: string;

  @ApiProperty()
  @IsString()
  filingDate: string;

  @ApiProperty()
  @IsString()
  referenceNumber: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  statusDate: string;
}

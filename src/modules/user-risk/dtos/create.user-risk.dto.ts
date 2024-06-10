import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsNumber,
  IsDate,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateUserRiskDto {
  @ApiProperty()
  @IsString()
  modelID: string;

  @ApiProperty()
  @IsString()
  decision: string;

  @ApiProperty()
  @IsString()
  woe: string;

  @ApiProperty()
  @IsString()
  woeDescription: string;

  @ApiProperty()
  @IsString()
  riskID: string;

  @ApiProperty()
  @IsString()
  riskTier: string;
}

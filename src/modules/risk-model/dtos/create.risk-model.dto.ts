import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsString, IsNumber, IsDate, ArrayNotEmpty } from 'class-validator';

export class CreateRiskModelDto {

  @ApiProperty()
  @IsString()
  evaluation: string;

  @ApiProperty()
  @IsString()
  modelIndicator: string;

  @ApiProperty()
  @IsString()
  score: string;

}

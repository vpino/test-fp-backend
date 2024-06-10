import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsString, IsNumber, IsDate, ArrayNotEmpty } from 'class-validator';

export class CreateEndTotalsDto {

  @ApiProperty()
  @IsString()
  totalSegments: string;

  @ApiProperty()
  @IsString()
  totalLength: string;

}

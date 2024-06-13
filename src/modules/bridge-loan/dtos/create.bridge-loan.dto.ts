import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsString, IsNumber, IsDate, ArrayNotEmpty } from 'class-validator';

export class CreateBridgeLoanDto {

  @ApiProperty()
  @IsString()
  leadUuid: string;

}

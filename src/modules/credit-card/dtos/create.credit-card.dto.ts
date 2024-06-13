import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsString, IsNumber, IsDate, ArrayNotEmpty } from 'class-validator';

export class CreateCreditCardDto {

  @ApiProperty()
  @IsString()
  leadUuid: string;

}


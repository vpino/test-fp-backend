import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsNumber,
  IsDate,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateEquifaxDto {
  @ApiProperty()
  @ArrayNotEmpty()
  enabledModules: string[];

  @ApiProperty()
  @IsBoolean()
  enabled: boolean;
}

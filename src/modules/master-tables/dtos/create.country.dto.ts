import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  iso3: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  iso2: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dialCode: string;
}

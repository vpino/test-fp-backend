import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNumberString } from 'class-validator';

export class HousingDataDTO {
  @ApiProperty({
    description: 'Type of housing',
    example: 'Apartment',
  })
  @IsString()
  @Length(1, 100)
  type: string;

  @ApiProperty({
    description: 'Year of purchase or construction',
    example: '2010',
  })
  @IsNumberString()
  @Length(4, 4)
  year: string;

  @ApiProperty({
    description: 'Month of purchase or construction',
    example: 'June',
  })
  @IsString()
  @Length(1, 50)
  month: string;
}

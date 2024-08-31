import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class HousingDataDTO {
  @ApiProperty({
    description: 'Type of housing',
    example: 'Apartment',
  })
  @IsString()
  @Length(1, 100)
  housingType: string;

  @ApiProperty({
    description: 'Year of purchase or construction',
    example: '2010',
  })
  @IsString()
  @Length(4, 50)
  housingYear: string;

  @ApiProperty({
    description: 'Month of purchase or construction',
    example: 'June',
  })
  @IsString()
  @Length(1, 50)
  housingMonth: string;
}

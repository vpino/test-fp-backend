import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNumberString } from 'class-validator';

export class EducationDataDTO {
  @ApiProperty({
    description: 'Level of education',
    example: 'Bachelor',
  })
  @IsString()
  @Length(1, 100)
  level: string;

  @ApiProperty({
    description: 'Area of specialization',
    example: 'Computer Science',
  })
  @IsString()
  @Length(1, 100)
  area: string;

  @ApiProperty({
    description: 'Year of graduation or last year attended',
    example: '2015',
  })
  @IsNumberString()
  @Length(4, 4)
  year: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class OccupationDTO {
  @ApiProperty({
    description: 'Occupation or job title',
    example: 'Software Engineer',
  })
  @IsString()
  @Length(1, 100)
  occupation: string;

  @ApiProperty({
    description: 'Type of business or industry',
    example: 'Technology',
  })
  @IsString()
  @Length(1, 100)
  typeBusiness: string;
}

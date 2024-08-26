import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoadNamesDTO {
  @ApiProperty({
    description: 'First name of the individual customer',
    example: 'John',
  })
  @IsString()
  @Length(1, 100)
  firstName: string;

  @ApiProperty({
    description: 'Last name of the individual customer',
    example: 'Doe',
  })
  @IsString()
  @Length(1, 100)
  lastName: string;
}

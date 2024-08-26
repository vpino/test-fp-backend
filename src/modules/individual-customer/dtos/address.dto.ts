import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class AddressDTO {
  @ApiProperty({
    description: 'Address of the individual customer',
    example: '123 Main St',
  })
  @IsString()
  @Length(1, 200)
  address: string;

  @ApiProperty({
    description: 'State of the individual customer',
    example: 'California',
  })
  @IsString()
  @Length(1, 100)
  state: string;

  @ApiProperty({
    description: 'City of the individual customer',
    example: 'Los Angeles',
  })
  @IsString()
  @Length(1, 100)
  city: string;

  @ApiProperty({
    description: 'Town or locality',
    example: 'Downtown',
  })
  @IsString()
  @Length(1, 100)
  town: string;
}

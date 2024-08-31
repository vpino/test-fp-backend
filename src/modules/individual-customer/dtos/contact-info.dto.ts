import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ContactInfoDTO {
  @ApiProperty({
    description: 'Phone number of the individual customer',
    example: '+1-555-555-5555',
  })
  @IsString(null)
  phone: string;
}

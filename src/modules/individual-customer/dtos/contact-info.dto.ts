import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class ContactInfoDTO {
  @ApiProperty({
    description: 'Phone number of the individual customer',
    example: '+1-555-555-5555',
  })
  @IsPhoneNumber(null)
  phone: string;
}

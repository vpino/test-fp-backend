import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateTermsAndConditionsDto {
  @ApiProperty({
    description: 'Indicates whether the terms and conditions are accepted',
    example: true,
    required: false,
  })
  @IsBoolean()
  tc: boolean;
}

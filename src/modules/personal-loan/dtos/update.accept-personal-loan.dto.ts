import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateAcceptPersonalLoanDto {
  @ApiProperty({
    description: 'accept personal loan',
    example: true,
    required: false,
  })
  @IsBoolean()
  condition: boolean;
}

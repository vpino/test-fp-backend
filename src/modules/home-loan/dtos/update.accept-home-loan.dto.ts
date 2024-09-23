import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateAcceptHomeLoanDto {
  @ApiProperty({
    description: 'accept home loan',
    example: true,
    required: false,
  })
  @IsBoolean()
  condition: boolean;
}

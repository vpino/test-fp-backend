import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GenerateBridgeLoanDto {
  @ApiProperty()
  @IsString()
  customerId: string;

  @ApiProperty()
  @IsString()
  riskId: string;

  @ApiProperty()
  @IsString()
  loanOfferId: string;
}

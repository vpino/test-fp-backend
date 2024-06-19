import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class GenerateUserRiskDto {
  @ApiProperty()
  @IsUUID()
  customerId: string;

  @ApiProperty()
  @IsString()
  employmentStatus: string;

  @ApiProperty()
  @IsString()
  payFrequency: string;

  @ApiProperty()
  @IsString()
  annualIncome: string;

  @ApiProperty()
  @IsString()
  educationLevel: string;
}

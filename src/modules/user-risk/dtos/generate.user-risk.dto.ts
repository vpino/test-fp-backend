import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GenerateUserRiskDto {
  @ApiProperty()
  @IsUUID()
  customerId: string;
}

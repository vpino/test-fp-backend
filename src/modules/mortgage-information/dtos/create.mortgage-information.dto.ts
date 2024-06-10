import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class CreateMortgageInformationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsString()
  propertyStatus: string;
}

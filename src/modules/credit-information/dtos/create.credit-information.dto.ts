import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCreditInformationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsString()
  providedCreditRating: string;
}

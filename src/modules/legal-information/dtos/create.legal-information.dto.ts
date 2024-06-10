import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class CreateLegalInformationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsBoolean()
  consentsToFcra: boolean;

  @ApiProperty()
  @IsBoolean()
  consentsToTcpa: boolean;

  @ApiProperty()
  @IsString()
  tcpaLanguage: string;

  @ApiProperty()
  @IsString()
  fcraLanguage: string;
}

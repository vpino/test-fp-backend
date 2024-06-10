import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateClientTagsDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @ArrayNotEmpty()
  @IsArray()
  subId: string[];
}

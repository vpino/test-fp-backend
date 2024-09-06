import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TypeHomeDto {
  @ApiProperty()
  @IsString()
  typeHome: string;
}

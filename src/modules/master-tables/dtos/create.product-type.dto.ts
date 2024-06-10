import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

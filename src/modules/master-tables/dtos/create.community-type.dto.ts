import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommunityTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

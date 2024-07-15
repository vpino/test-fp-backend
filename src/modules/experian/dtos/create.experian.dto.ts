import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, ArrayNotEmpty } from 'class-validator';

export class CreateExperianDto {
  @ApiProperty()
  @ArrayNotEmpty()
  enabledModules: string[];

  @ApiProperty()
  @IsBoolean()
  enabled: boolean;
}

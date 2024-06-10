import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsBoolean, IsString, IsNumber, IsDate, ArrayNotEmpty, ValidateNested } from 'class-validator';

export class CreateScoreFactorsDto {

  @ApiProperty()
  @IsString()
  importance: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty({ type: [CreateScoreFactorsDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateScoreFactorsDto)
  scoreFactors: CreateScoreFactorsDto[];
}

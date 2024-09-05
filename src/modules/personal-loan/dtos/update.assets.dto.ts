import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class UpdateAssetsDto {
  @ApiProperty({
    description: 'List of assets associated with the loan',
    example: ['Car', 'House'],
    required: false,
  })
  @IsArray()
  assets: string[];

  @ApiProperty({
    description: 'Total amount of assets',
    example: 15000,
    required: false,
  })
  @IsNumber()
  assetsAmount: number;
}

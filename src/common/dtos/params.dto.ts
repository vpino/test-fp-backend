import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  IsObject,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

class SortOptions {
  @IsString()
  @IsEnum(SortOrder)
  direction: SortOrder;
}

export class ParamsDTO<T> {
  @ApiProperty({ description: 'Filter conditions for querying entities' })
  @IsOptional()
  @IsObject()
  filter?: Record<string, any>;

  @ApiProperty({ description: 'Sorting options for querying entities' })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortOptions)
  sort?: Record<string, SortOptions>;

  @ApiProperty({ description: 'Number of records to return' })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiProperty({ description: 'Number of records to skip' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;

  @ApiProperty({ description: 'Fields to select in the query' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fieldSelected?: (keyof T)[];

  @ApiProperty({ description: 'Relations to populate in the query' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relations?: string[];
}

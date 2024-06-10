import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class PaginationDTO {
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  limit?: number;

  @Type(() => Number)
  @IsOptional()
  @Min(0)
  offset?: number;
}

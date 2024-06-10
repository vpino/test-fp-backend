import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ParamsDTO } from '../dtos/params.dto';

export function buildQuery<T>(query): ParamsDTO<T> {
  const { limit, skip, filter, sort, fieldSelected, relations } = query;

  const params = plainToClass(ParamsDTO, {
    filter,
    sort,
    limit,
    skip,
    fieldSelected,
    relations
  });

  const errors = validateSync(params);
  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors}`);
  }

  return params;
}

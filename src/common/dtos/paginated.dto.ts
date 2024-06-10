export class PaginatedDto {
  /**
   * Total records
   * @example 1
   */
  total: number;

  /**
   * Maximum number of records to show
   * @example 10
   */
  limit: number;

  /**
   * Number of records to skip
   * @example 0
   */
  offset: number;

  results: unknown[];

  constructor() {
    this.limit = 10;
    this.offset = 0;
  }
}

export class ResponseDTO<T = any> {
  data?: T;
  count?: number;
  limit?: number;
  skip?: number;
  message?: string;
}

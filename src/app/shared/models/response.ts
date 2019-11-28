export interface Response<T> {
  status: string;
  data: T;
  token?: string;
}

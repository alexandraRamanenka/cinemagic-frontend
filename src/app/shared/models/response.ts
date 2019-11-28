export interface Response<T> {
  status: string;
  data: T;
  token?: {
    expire: number;
    token: string;
  };
}

export interface IErrorResponse {
  message: string;
  code?: number | null;
}

export interface IResponse {
  msg: string;
  data: any;
  errors: IErrorResponse | null;
}

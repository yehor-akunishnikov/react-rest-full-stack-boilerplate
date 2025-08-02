import type { AxiosError } from "axios";

export type HttpSuccessResponse<T> = {
  data: T;
  status: number;
  isFailed: false;
};

export type HttpErrorResponse = {
  error: AxiosError;
  isFailed: true;
};

export type HttpResponse<T> = HttpSuccessResponse<T> | HttpErrorResponse;

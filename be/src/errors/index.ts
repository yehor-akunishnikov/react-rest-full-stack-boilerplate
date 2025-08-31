import type { HTTP_STATUS_CODE } from "../types/http";

export class AppError implements Error {
  readonly name = "APP ERROR";

  constructor(
    readonly message: string,
    readonly status: HTTP_STATUS_CODE,
  ) {}
}

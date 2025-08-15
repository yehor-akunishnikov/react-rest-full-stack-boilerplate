import type { HTTP_STATUS_CODE } from "../types";

export class AppError implements Error {
  readonly name = "APP ERROR";

  constructor(
    readonly message: string,
    readonly status: HTTP_STATUS_CODE,
  ) {}
}

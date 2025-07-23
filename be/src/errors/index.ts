import { HTTP_STATUS_CODE } from "../types/http";

export interface AppError extends Error {
  status?: number;
  errorName?: string;
}

export abstract class DbError extends Error implements AppError {
  public readonly originalErrorInstance: unknown;
  public readonly errorName: string;
  public readonly status?: HTTP_STATUS_CODE;
}

export class DbInsertError extends DbError {
  public readonly errorName = "DbInsertError";

  constructor(
    message: string,
    public readonly originalErrorInstance: unknown,
    public readonly status?: HTTP_STATUS_CODE,
  ) {
    super(message);
  }
}

export class AuthError extends Error implements AppError {
  public readonly errorName = "AuthError";
  public readonly status: HTTP_STATUS_CODE.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends Error implements AppError {
  public readonly errorName = "NotFoundError";
  public readonly status: HTTP_STATUS_CODE.NOT_FOUND;

  constructor(message: string) {
    super(message);
  }
}

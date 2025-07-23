import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod/v4";

import { AppError, AuthError, DbError, NotFoundError } from "../errors";
import { HTTP_STATUS_CODE } from "../types/http";

export function errorHandlerMW(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const status = err.status;

  if (err instanceof AuthError) {
    res.status(status ?? HTTP_STATUS_CODE.UNAUTHORIZED).json({
      message: err.message ?? "Unauthorized",
    });
  } else if (err instanceof NotFoundError) {
    res.status(status ?? HTTP_STATUS_CODE.NOT_FOUND).json({
      message: err.message ?? "Not found",
    });
  } else if (err instanceof DbError) {
    console.error(
      `${err.errorName}: ${err.message}`,
      err.originalErrorInstance,
    );

    res.status(status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: err.message ?? "Internal Server Error",
    });
  } else if (err instanceof ZodError) {
    console.error(`Zod Error: ${z.prettifyError(err)}`);

    res.status(status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: err.message ? z.prettifyError(err) : "Invalid request",
    });
  } else {
    console.error(`${err.errorName ?? "Unknown Error"}: ${err.message}`);

    res.status(status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: err.message ?? "Internal Server Error",
    });
  }
}

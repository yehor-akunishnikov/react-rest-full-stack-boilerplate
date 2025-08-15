import { NextFunction, Request, Response } from "express";

import { HTTP_STATUS_CODE } from "../types";
import { AppError } from "../errors";

export function errorHandlerMW(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.status(err.status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    message: err.message ?? "Internal Server Error",
  });
}

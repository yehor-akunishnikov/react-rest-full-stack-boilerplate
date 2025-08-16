import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod/v4";

import { HTTP_STATUS_CODE } from "../types";
import { AppError } from "../errors";

export function errorHandlerMW(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof ZodError) {
    console.error(`Zod Error: ${z.prettifyError(err)}`);

    res.status(err.status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: err.message ? z.prettifyError(err) : "Invalid request",
    });

    return;
  }

  if (err.message === "Unknown query error") {
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });

    return;
  }

  res.status(err.status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    message: err.message ?? "Internal Server Error",
  });
}

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { HTTP_STATUS_CODE } from "../types";
import { userRepo } from "../features/user";
import { AppError } from "../errors";
import config from "../config";

function safeDecode<D>(token: string): D | null {
  try {
    return (jwt.verify(token, config.authSecret) as JwtPayload).data;
  } catch (e) {
    return null;
  }
}

export function authMW(): (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const token = (req.header("Authorization") ?? "").split(" ")[1];
    const authError = new AppError(
      "Unauthorized",
      HTTP_STATUS_CODE.UNAUTHORIZED,
    );

    if (!token) return next(authError);

    const email = safeDecode<string>(token);

    if (!email) return next(authError);

    const user = await userRepo.findOneByKey("email", email);

    if (!user) return next(authError);

    res.locals.authData = {
      userId: user.id,
    };

    return next();
  };
}

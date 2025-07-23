import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import * as userRepo from "../features/user/repo";
import { AuthError } from "../errors";
import config from "../config";

function safeDecode<D>(token: string): D | null {
  try {
    return (jwt.verify(token, config.authSecret) as JwtPayload).data;
  } catch (e) {
    return null;
  }
}

export async function authMW(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = (req.header("Authorization") ?? "").split(" ")[1];
  const authError = new AuthError("Unauthorized");

  if (!token) return next(authError);

  const email = safeDecode<string>(token);

  if (!email) return next(authError);

  const user = await userRepo.findOneByEmail(email);

  if (!user) return next(authError);

  res.locals.userId = user.id;

  return next();
}

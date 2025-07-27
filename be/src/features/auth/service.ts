import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { LoginPayload, RegisterPayload } from "./validators";
import * as userRepo from "../user/repo";
import * as authRepo from "./repo";
import config from "../../config";

export async function register(payload: RegisterPayload): Promise<void> {
  const password = await bcrypt.hash(payload.password, 10);

  await authRepo.register({
    ...payload,
    password,
  });
}

export async function login(payload: LoginPayload): Promise<string | null> {
  const user = await userRepo.findOneByEmail(payload.email);
  if (!user) return null;

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) return null;

  return jwt.sign(
    {
      data: user.email,
    },
    config.authSecret,
    { expiresIn: "1h" },
  );
}

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { LoginPayload, RegisterPayload } from "./validators";
import { userRepo } from "../user/repo";
import config from "../../config";

async function register(payload: RegisterPayload): Promise<void> {
  const password = await bcrypt.hash(payload.password, 10);

  await userRepo.create({
    ...payload,
    password,
  });
}

async function login(payload: LoginPayload): Promise<string | null> {
  const user = await userRepo.findOneByKey("email", payload.email);
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

export const authService = {
  register,
  login,
};

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { getUserRepo } from "../user";
import config from "../../config";

import { LoginPayload, RegisterPayload } from "./validators";

async function register(payload: RegisterPayload): Promise<void> {
  const userRepo = getUserRepo();

  const password = await bcrypt.hash(payload.password, 10);

  const user = userRepo.create({
    ...payload,
    password,
  });

  await userRepo.save(user);
}

async function login(payload: LoginPayload): Promise<string | null> {
  const userRepo = getUserRepo();

  const user = await userRepo.findOneBy({ email: payload.email });
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

import type { UserToProjectSelect } from "../../db/references/types";
import { ForbiddenError } from "../../errors";
import * as inviteRepo from "./repo";

export async function getByToken(token: string) {
  const entity = await inviteRepo.findByToken(token);
  const forbiddenError = new ForbiddenError(
    "Invitation is invalid or has expired.",
  );

  if (!entity) throw forbiddenError;
  if (entity.status !== "PENDING") throw forbiddenError;
  if (new Date() > entity.expiresAt) throw forbiddenError;

  return entity;
}

export async function acceptInvite(
  userId: string,
  inviteId: string,
): Promise<UserToProjectSelect> {
  return inviteRepo.acceptInvite(userId, inviteId);
}

import { eq } from "drizzle-orm";

import type { UserToProjectSelect } from "../../db/references/types";
import { userToProjectSchema } from "../../db/references/schema";
import type { InviteSelect } from "../../db/models/types";
import { inviteSchema } from "../../db/models/schema";
import { takeFirst } from "../../utils/common";
import { db } from "../../db";

type FindByTokenRelations = {
  project: { name: string };
  inviter: { name: string };
};

export function findByToken(
  token: string,
): Promise<(InviteSelect & FindByTokenRelations) | undefined> {
  return db.query.inviteSchema.findFirst({
    where: eq(inviteSchema.token, token),
    with: {
      project: { columns: { name: true } },
      inviter: { columns: { name: true } },
    },
  });
}

export async function acceptInvite(
  userId: string,
  inviteId: string,
): Promise<UserToProjectSelect> {
  return db.transaction(async (tx) => {
    const invite = await tx
      .select()
      .from(inviteSchema)
      .where(eq(inviteSchema.id, inviteId))
      .limit(1)
      .then(takeFirst);

    await tx.update(inviteSchema).set({ status: "ACCEPTED" });

    return db
      .insert(userToProjectSchema)
      .values({
        userId,
        projectId: invite.projectId,
      })
      .returning()
      .then(takeFirst);
  });
}

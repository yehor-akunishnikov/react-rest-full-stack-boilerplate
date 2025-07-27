import { eq } from "drizzle-orm";

import { membershipSchema } from "../../db/references/schema";
import { inviteSchema } from "../../db/models/schema";
import { takeFirst } from "../../utils/common";
import { db } from "../../db";

export function findByToken(token: string) {
  return db.query.inviteSchema.findFirst({
    where: eq(inviteSchema.token, token),
    with: {
      project: { columns: { name: true } },
      inviter: { columns: { name: true } },
    },
  });
}

export async function acceptInvite(userId: string, inviteId: string) {
  return db.transaction(async (tx) => {
    const invite = await tx
      .select()
      .from(inviteSchema)
      .where(eq(inviteSchema.id, inviteId))
      .limit(1)
      .then(takeFirst);

    await tx.update(inviteSchema).set({ status: "ACCEPTED" });

    return db
      .insert(membershipSchema)
      .values({
        userId,
        projectId: invite.projectId,
      })
      .returning()
      .then(takeFirst);
  });
}

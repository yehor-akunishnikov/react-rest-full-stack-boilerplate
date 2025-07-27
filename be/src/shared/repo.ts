import { and, eq } from "drizzle-orm";

import { memberKindEnum, membershipSchema } from "../db/references/schema";
import { takeFirst } from "../utils/common";
import { db } from "../db";

export async function getMemberKind(
  userId: string,
  projectId: string,
): Promise<(typeof memberKindEnum.enumValues)[number] | null> {
  const membership = await db
    .select()
    .from(membershipSchema)
    .where(
      and(
        eq(membershipSchema.userId, userId),
        eq(membershipSchema.projectId, projectId),
      ),
    )
    .limit(1)
    .then(takeFirst);

  if (!membership) {
    return null;
  }

  return membership.memberKind;
}

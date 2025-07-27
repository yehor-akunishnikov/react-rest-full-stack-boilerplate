import { and, eq } from "drizzle-orm";

import { memberKindEnum, userToProjectSchema } from "../db/references/schema";
import { takeFirst } from "../utils/common";
import { db } from "../db";

export async function getMemberKind(
  userId: string,
  projectId: string,
): Promise<(typeof memberKindEnum.enumValues)[number]> {
  const { memberKind } = await db
    .select()
    .from(userToProjectSchema)
    .where(
      and(
        eq(userToProjectSchema.userId, userId),
        eq(userToProjectSchema.projectId, projectId),
      ),
    )
    .limit(1)
    .then(takeFirst);

  return memberKind;
}

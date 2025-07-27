import { eq, ilike } from "drizzle-orm";

import type { ProjectInsert, ProjectSelect } from "../../db/models/types";
import { inviteSchema, projectSchema } from "../../db/models/schema";
import { userToProjectSchema } from "../../db/references/schema";
import { takeFirst } from "../../utils/common";
import { db } from "../../db";

export async function create(userId: string, payload: ProjectInsert) {
  return db.transaction(async () => {
    const project = await db
      .insert(projectSchema)
      .values(payload)
      .returning()
      .then(takeFirst);

    await db
      .insert(userToProjectSchema)
      .values({ userId, projectId: project.id, memberKind: "ADMIN" });

    return project;
  });
}

export async function findAll(userId: string, search: string = "", limit = 10) {
  return db.query.projectSchema.findMany({
    where: ilike(projectSchema.name, `%${search}%`),
    with: {
      projectsToUsers: {
        where: eq(userToProjectSchema.userId, userId),
        columns: { userId: true },
      },
    },
    limit,
  });
}

export async function findOne<K extends keyof ProjectSelect>(
  userId: string,
  key: K,
  value: ProjectSelect[K],
) {
  return db.query.projectSchema.findFirst({
    where: eq(projectSchema[key], value),
    with: {
      projectsToUsers: {
        where: eq(userToProjectSchema.userId, userId),
        columns: { userId: true },
      },
    },
  });
}

export async function update(id: string, payload: Partial<ProjectSelect>) {
  return db
    .update(projectSchema)
    .set(payload)
    .where(eq(projectSchema.id, id))
    .returning()
    .then(takeFirst);
}

export async function remove(id: string) {
  return db
    .delete(projectSchema)
    .where(eq(projectSchema.id, id))
    .returning({ id: projectSchema.id })
    .then(takeFirst);
}

export async function createInvite(
  projectId: string,
  userId: string,
  token: string,
  expiresAt: Date,
) {
  return db
    .insert(inviteSchema)
    .values({
      inviterId: userId,
      projectId,
      token,
      expiresAt,
    })
    .returning()
    .then(takeFirst);
}

import { eq, ilike } from "drizzle-orm";

import { userToProjectSchema } from "../../db/references/schema";
import { projectSchema } from "../../db/models/schema";
import { takeFirst } from "../../utils/common";
import { DbInsertError } from "../../errors";
import { db } from "../../db";
import type {
  ProjectInsert,
  ProjectSelect,
} from "../../db/models/project/types";

export async function create(
  userId: number,
  payload: ProjectInsert,
): Promise<ProjectSelect> {
  try {
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
  } catch (e) {
    throw new DbInsertError("Failed to create project", e);
  }
}

export async function findAll(
  search: string = "",
  limit = 10,
): Promise<ProjectSelect[]> {
  return db
    .select()
    .from(projectSchema)
    .where(ilike(projectSchema.name, `%${search}%`))
    .limit(limit);
}

export async function findOne<K extends keyof ProjectSelect>(
  key: K,
  value: ProjectSelect[K],
): Promise<ProjectSelect> {
  return db
    .select()
    .from(projectSchema)
    .where(eq(projectSchema[key], value))
    .limit(1)
    .then(takeFirst);
}

export async function update(
  id: string,
  payload: Partial<ProjectSelect>,
): Promise<ProjectSelect> {
  return db
    .update(projectSchema)
    .set(payload)
    .where(eq(projectSchema.id, id))
    .returning()
    .then(takeFirst);
}

export async function remove(id: string): Promise<{ id: ProjectSelect["id"] }> {
  return db
    .delete(projectSchema)
    .where(eq(projectSchema.id, id))
    .returning({ id: projectSchema.id })
    .then(takeFirst);
}

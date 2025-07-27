import { eq } from "drizzle-orm";

import type { TaskInsert } from "../../db/models/types";
import { taskSchema } from "../../db/models/schema";
import { takeFirst } from "../../utils/common";
import { db } from "../../db";

export async function create(payload: TaskInsert) {
  return db.insert(taskSchema).values(payload).returning().then(takeFirst);
}

export async function findAll(listId: string) {
  return db.query.taskSchema.findMany({
    where: eq(taskSchema.listId, listId),
  });
}

export async function update(id: string, payload: Partial<TaskInsert>) {
  return db
    .update(taskSchema)
    .set(payload)
    .where(eq(taskSchema.id, id))
    .returning()
    .then(takeFirst);
}

export async function remove(taskId: string) {
  return db
    .delete(taskSchema)
    .where(eq(taskSchema.id, taskId))
    .returning()
    .then(takeFirst);
}

import { eq } from "drizzle-orm";

import type { ListInsert } from "../../db/models/types";
import { listSchema } from "../../db/models/schema";
import { takeFirst } from "../../utils/common";
import { db } from "../../db";

export async function create(payload: ListInsert) {
  return db.insert(listSchema).values(payload).returning().then(takeFirst);
}

export async function update(id: string, payload: Partial<ListInsert>) {
  return db
    .update(listSchema)
    .set(payload)
    .where(eq(listSchema.id, id))
    .returning()
    .then(takeFirst);
}

export async function remove(listId: string) {
  return db
    .delete(listSchema)
    .where(eq(listSchema.id, listId))
    .returning()
    .then(takeFirst);
}

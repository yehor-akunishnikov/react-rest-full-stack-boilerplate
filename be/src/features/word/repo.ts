import { eq, ilike } from "drizzle-orm";

import type { WordInsert, WordSelect } from "../../db/models/word/types";
import { DbInsertError, NotFoundError } from "../../errors";
import { wordSchema } from "../../db/models/word/schema";
import { db } from "../../db";

export async function insert(payload: WordInsert): Promise<{ id: number }> {
  try {
    return db
      .insert(wordSchema)
      .values(payload)
      .returning({ id: wordSchema.id })
      .then((words) => words[0]);
  } catch (e) {
    throw new DbInsertError("Failed to create word", e);
  }
}

export async function findById(id: number): Promise<WordSelect> {
  const result = await db
    .select()
    .from(wordSchema)
    .where(eq(wordSchema.id, id))
    .limit(1);

  if (!result.length) {
    throw new NotFoundError(`Failed to find word by id: ${id}`);
  }

  return result[0];
}

export async function findAll<K extends keyof WordSelect>(
  key?: K,
  term?: WordSelect[K],
): Promise<WordSelect[]> {
  if (!key || !term) {
    return db.select().from(wordSchema);
  }

  return db
    .select()
    .from(wordSchema)
    .where(eq(wordSchema[key], term as never));
}

export async function findAllMatching<
  K extends keyof Pick<WordSelect, "spelling">,
>(key: K, term: WordSelect[K]): Promise<WordSelect[]> {
  return db
    .select()
    .from(wordSchema)
    .where(ilike(wordSchema[key], `%${term}%`));
}

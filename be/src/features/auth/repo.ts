import { UserInsert, UserSelect } from "../../db/models/types";
import { userSchema } from "../../db/models/schema";
import { DbInsertError } from "../../errors";
import { db } from "../../db";

export async function insert(payload: UserInsert): Promise<UserSelect> {
  try {
    const result = await db.insert(userSchema).values(payload).returning();

    return result[0];
  } catch (e) {
    throw new DbInsertError("Failed to register", e);
  }
}

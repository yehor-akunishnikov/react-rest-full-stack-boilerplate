import { UserInsert, UserSelect } from "../../db/models/types";
import { userSchema } from "../../db/models/schema";
import { takeFirst } from "../../utils/common";
import { DbInsertError } from "../../errors";
import { db } from "../../db";

export async function insert(payload: UserInsert): Promise<UserSelect> {
  try {
    return await db
      .insert(userSchema)
      .values(payload)
      .returning()
      .then(takeFirst);
  } catch (e) {
    throw new DbInsertError("Failed to register", e);
  }
}

import { eq } from "drizzle-orm";

import { userSchema } from "../../db/models/schema";
import { NotFoundError } from "../../errors";
import { db } from "../../db";

export async function findById(id: string) {
  const result = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.id, id))
    .limit(1);

  if (!result.length) {
    throw new NotFoundError(`Failed to find user with id: ${id}`);
  }

  return result[0];
}

export async function findOneByEmail(email: string) {
  const result = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email))
    .limit(1);

  if (!result.length) {
    return null;
  }

  return result[0];
}

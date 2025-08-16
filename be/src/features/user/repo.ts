import { eq } from "drizzle-orm";

import { handleQueryError, takeFirst } from "../../utils";
import type { UserInsert, UserSelect } from "./types";
import { User } from "./models";
import { db } from "../../db";

class UserRepo {
  async findOneByKey<K extends keyof UserSelect>(
    key: K,
    value: UserSelect[K],
  ): Promise<UserSelect | null> {
    return db
      .select()
      .from(User)
      .where(eq(User[key], value))
      .then(takeFirst)
      .catch(handleQueryError);
  }

  async create(payload: UserInsert): Promise<UserSelect> {
    return db
      .insert(User)
      .values(payload)
      .returning()
      .then(takeFirst)
      .catch(handleQueryError);
  }
}

export const userRepo = new UserRepo();

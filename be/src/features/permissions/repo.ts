import { eq } from "drizzle-orm";

import type {
  PermissionInsert,
  PermissionSelect,
} from "../../db/models/permission/types";
import { permissionSchema } from "../../db/models/schema";
import { takeFirst } from "../../utils/common";
import { DbInsertError } from "../../errors";
import { db } from "../../db";

export async function create(
  payload: PermissionInsert,
): Promise<PermissionSelect> {
  try {
    return await db
      .insert(permissionSchema)
      .values(payload)
      .returning()
      .then(takeFirst);
  } catch (e) {
    throw new DbInsertError("Failed to create permission", e);
  }
}

export async function findAll(): Promise<PermissionSelect[]> {
  return db.select().from(permissionSchema);
}

export async function remove(
  id: number,
): Promise<{ id: PermissionSelect["id"] }> {
  return db
    .delete(permissionSchema)
    .where(eq(permissionSchema.id, id))
    .returning({ id: permissionSchema.id })
    .then(takeFirst);
}

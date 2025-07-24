import { and, eq, inArray } from "drizzle-orm";

import type { RolesToPermissionsSelect } from "../../db/references/types";
import type { RoleInsert, RoleSelect } from "../../db/models/role/types";
import { rolesToPermissionsSchema } from "../../db/references/schema";
import { roleSchema } from "../../db/models/schema";
import { takeFirst } from "../../utils/common";
import { DbInsertError } from "../../errors";
import { db } from "../../db";
import type { PermissionSelect } from "../../db/models/permission/types";

export async function create(payload: RoleInsert): Promise<RoleSelect> {
  try {
    return await db
      .insert(roleSchema)
      .values(payload)
      .returning()
      .then(takeFirst);
  } catch (e) {
    throw new DbInsertError("Failed to create role", e);
  }
}

export async function findAll(): Promise<RoleSelect[]> {
  return db.select().from(roleSchema);
}

export async function findPermissions(id: number): Promise<PermissionSelect[]> {
  return db.query.roleSchema
    .findFirst({
      where: eq(roleSchema.id, id),
      with: {
        rolesToPermissions: {
          with: {
            permission: true,
          },
        },
      },
    })
    .then((role) =>
      (role?.rolesToPermissions ?? []).map(({ permission }) => permission),
    );
}

export async function findOne<K extends keyof RoleSelect>(
  key: K,
  value: RoleSelect[K],
): Promise<RoleSelect> {
  return db
    .select()
    .from(roleSchema)
    .where(eq(roleSchema[key], value))
    .limit(1)
    .then(takeFirst);
}

export async function update(
  id: number,
  payload: Partial<RoleSelect>,
): Promise<RoleSelect> {
  return db
    .update(roleSchema)
    .set(payload)
    .where(eq(roleSchema.id, id))
    .returning()
    .then(takeFirst);
}

export async function remove(id: number): Promise<{ id: RoleSelect["id"] }> {
  return db
    .delete(roleSchema)
    .where(eq(roleSchema.id, id))
    .returning({ id: roleSchema.id })
    .then(takeFirst);
}

export async function assignPermissions(
  roleId: number,
  permissionIds: number[],
): Promise<void> {
  await db
    .insert(rolesToPermissionsSchema)
    .values(permissionIds.map((permissionId) => ({ roleId, permissionId })))
    .onConflictDoNothing();
}

export async function revokePermissions(
  roleId: number,
  permissionIds: number[],
): Promise<RolesToPermissionsSelect> {
  return db
    .delete(rolesToPermissionsSchema)
    .where(
      and(
        eq(rolesToPermissionsSchema.roleId, roleId),
        inArray(rolesToPermissionsSchema.permissionId, permissionIds),
      ),
    )
    .returning()
    .then(takeFirst);
}

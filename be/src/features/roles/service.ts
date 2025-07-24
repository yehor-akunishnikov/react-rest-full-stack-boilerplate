import type { CreateRolePayload, UpdateRolePayload } from "./validators";
import type { RoleSelect } from "../../db/models/role/types";
import { setUpdatedAt } from "../../utils/common";
import { NotFoundError } from "../../errors";
import * as roleRepo from "./repo";
import type { RolesToPermissionsSelect } from "../../db/references/types";

export function getAll(): Promise<RoleSelect[]> {
  return roleRepo.findAll();
}

export function getPermissions(id: number): Promise<string[]> {
  return roleRepo.findPermissions(id);
}

export async function getById(id: string): Promise<RoleSelect> {
  try {
    return await roleRepo.findOne("id", Number(id));
  } catch (e) {
    throw new NotFoundError(`Role with id: ${id} not found`);
  }
}

export async function create(payload: CreateRolePayload): Promise<RoleSelect> {
  return roleRepo.create(payload);
}

export async function update(
  id: string,
  payload: UpdateRolePayload,
): Promise<RoleSelect> {
  const entity = await roleRepo.update(Number(id), setUpdatedAt(payload));

  if (!entity) {
    throw new NotFoundError(`Role with id: ${id} not found`);
  }

  return entity;
}

export async function remove(id: number): Promise<void> {
  const entity = await roleRepo.remove(id);

  if (!entity) {
    throw new NotFoundError(`Role with id: ${id} not found`);
  }

  return;
}

export async function assignPermission(
  roleId: number,
  permissionId: number,
): Promise<void> {
  return roleRepo.assignPermission(roleId, permissionId);
}

export async function revokePermission(
  roleId: number,
  permissionId: number,
): Promise<RolesToPermissionsSelect> {
  return roleRepo.revokePermission(roleId, permissionId);
}

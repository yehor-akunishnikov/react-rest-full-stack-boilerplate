import type { PermissionSelect } from "../../db/models/permission/types";
import type { CreatePermissionPayload } from "./validators";
import { NotFoundError } from "../../errors";
import * as permissionRepo from "./repo";

export function getAll(): Promise<PermissionSelect[]> {
  return permissionRepo.findAll();
}

export async function create(
  payload: CreatePermissionPayload,
): Promise<PermissionSelect> {
  return permissionRepo.create(payload);
}

export async function remove(permissionId: number): Promise<void> {
  const entity = await permissionRepo.remove(permissionId);

  if (!entity) {
    throw new NotFoundError(
      `Permission with permissionId: ${permissionId} not found`,
    );
  }

  return;
}

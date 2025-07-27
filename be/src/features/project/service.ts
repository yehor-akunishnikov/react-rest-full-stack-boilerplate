import { randomBytes } from "node:crypto";

import type { ProjectSelect } from "../../db/models/project/types";
import { ForbiddenError, NotFoundError } from "../../errors";
import { getMemberKind } from "../../shared/repo";
import { setUpdatedAt } from "../../utils/common";
import * as projectRepo from "./repo";
import config from "../../config";
import type {
  CreateProjectPayload,
  ProjectGetAllQueryParams,
  UpdateProjectPayload,
} from "./validators";

export function getAll(
  userId: string,
  query: ProjectGetAllQueryParams,
): Promise<ProjectSelect[]> {
  return projectRepo.findAll(userId, query.search, query.limit);
}

export async function getById(
  userId: string,
  id: string,
): Promise<ProjectSelect> {
  const entity = await projectRepo.findOne(userId, "id", id);

  if (!entity) {
    throw new NotFoundError(`Project with id: ${id} not found`);
  }

  return entity;
}

export async function create(
  userId: string,
  payload: CreateProjectPayload,
): Promise<ProjectSelect> {
  return projectRepo.create(userId, payload);
}

export async function update(
  userId: string,
  id: string,
  payload: UpdateProjectPayload,
): Promise<ProjectSelect> {
  const kind = await getMemberKind(userId, id);

  if (kind === "ADMIN") {
    const entity = await projectRepo.update(id, setUpdatedAt(payload));

    if (!entity) {
      throw new NotFoundError(`Project with id: ${id} not found`);
    }

    return entity;
  }

  throw new ForbiddenError("You are not allowed to update project");
}

export async function remove(userId: string, id: string): Promise<void> {
  const kind = await getMemberKind(userId, id);

  if (kind === "ADMIN") {
    const entity = await projectRepo.remove(id);

    if (!entity) {
      throw new NotFoundError(`Project with id: ${id} not found`);
    }

    return;
  }

  throw new ForbiddenError("You are not allowed to delete project");
}

export async function createInvite(
  projectId: string,
  userId: string,
): Promise<string> {
  const kind = await getMemberKind(userId, projectId);

  if (kind === "ADMIN") {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 1);

    const entity = await projectRepo.createInvite(
      projectId,
      userId,
      token,
      expiresAt,
    );

    return `${config.uiHost}/invite/${entity.token}`;
  }

  throw new ForbiddenError("You are not allowed to create invite");
}

import { randomBytes } from "node:crypto";

import type { ProjectSelect } from "../../db/models/project/types";
import { NotFoundError } from "../../errors";
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

export async function getById(id: string): Promise<ProjectSelect> {
  const entity = await projectRepo.findOne("id", id);

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
  id: string,
  payload: UpdateProjectPayload,
): Promise<ProjectSelect> {
  return projectRepo.update(id, setUpdatedAt(payload));
}

export async function remove(id: string): Promise<void> {
  await projectRepo.remove(id);
}

export async function createInvite(
  projectId: string,
  userId: string,
): Promise<string> {
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

import type { ProjectSelect } from "../../db/models/project/types";
import { setUpdatedAt } from "../../utils/common";
import { NotFoundError } from "../../errors";
import * as projectRepo from "./repo";
import type {
  CreateProjectPayload,
  ProjectGetAllQueryParams,
  UpdateProjectPayload,
} from "./validators";

export function getAll(
  query: ProjectGetAllQueryParams,
): Promise<ProjectSelect[]> {
  return projectRepo.findAll(query.search, query.limit);
}

export async function getById(id: string): Promise<ProjectSelect> {
  try {
    return await projectRepo.findOne("id", id);
  } catch (e) {
    throw new NotFoundError(`Project with id: ${id} not found`);
  }
}

export async function create(
  userId: number,
  payload: CreateProjectPayload,
): Promise<ProjectSelect> {
  return projectRepo.create(userId, payload);
}

export async function update(
  id: string,
  payload: UpdateProjectPayload,
): Promise<ProjectSelect> {
  const entity = await projectRepo.update(id, setUpdatedAt(payload));

  if (!entity) {
    throw new NotFoundError(`Project with id: ${id} not found`);
  }

  return entity;
}

export async function remove(id: string): Promise<void> {
  const entity = await projectRepo.remove(id);

  if (!entity) {
    throw new NotFoundError(`Project with id: ${id} not found`);
  }

  return;
}

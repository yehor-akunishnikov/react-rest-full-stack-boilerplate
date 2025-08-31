import type { CreateProjectDTO } from "./validators";
import type { ProjectSelect } from "./types";
import { projectRepo } from "./repo";

async function create(payload: CreateProjectDTO): Promise<ProjectSelect> {
  return projectRepo.create(payload);
}

export const projectService = {
  create,
};

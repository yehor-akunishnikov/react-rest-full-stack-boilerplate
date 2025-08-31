import type { CreateTaskDTO } from "./validators";
import type { TaskSelect } from "./types";
import { taskRepo } from "./repo";

async function create(
  projectId: number,
  payload: CreateTaskDTO,
): Promise<TaskSelect> {
  return taskRepo.create({
    ...payload,
    projectId,
  });
}

export const taskService = {
  create,
};

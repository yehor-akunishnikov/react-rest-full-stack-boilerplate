import type { CreateTaskPayload, UpdateTaskPayload } from "./validators";
import type { TaskSelect } from "../../db/models/types";
import { setUpdatedAt } from "../../utils/common";
import * as listRepo from "./repo";

export async function getAll(listId: string) {
  return listRepo.findAll(listId);
}

export async function create(
  userId: string,
  payload: CreateTaskPayload,
): Promise<TaskSelect> {
  return listRepo.create({
    ...payload,
    createdBy: userId,
  });
}

export async function update(
  id: string,
  payload: UpdateTaskPayload,
): Promise<TaskSelect> {
  return listRepo.update(id, setUpdatedAt(payload));
}

export async function remove(taskId: string): Promise<TaskSelect> {
  return listRepo.remove(taskId);
}

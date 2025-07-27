import type { CreateListPayload, UpdateListPayload } from "./validators";
import type { ListSelect } from "../../db/models/types";
import { setUpdatedAt } from "../../utils/common";
import * as listRepo from "./repo";

export async function create(
  projectId: string,
  payload: CreateListPayload,
): Promise<ListSelect> {
  return listRepo.create({
    ...payload,
    projectId,
  });
}

export async function update(
  id: string,
  payload: UpdateListPayload,
): Promise<ListSelect> {
  return listRepo.update(id, setUpdatedAt(payload));
}

export async function remove(listId: string): Promise<ListSelect> {
  return listRepo.remove(listId);
}

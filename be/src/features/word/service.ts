import type { WordSelect } from "../../db/models/word/types";
import type { CreateWordPayload, GetAllQueryParams } from "./validators";
import * as wordRepo from "./repo";

export async function create(
  payload: CreateWordPayload,
  authorId: number,
): Promise<{ id: number }> {
  return wordRepo.insert({
    ...payload,
    authorId,
  });
}

export async function getById(id: number): Promise<WordSelect> {
  return wordRepo.findById(id);
}

export async function getAll({
  search,
}: GetAllQueryParams): Promise<WordSelect[]> {
  return wordRepo.findAllMatching("spelling", search);
}

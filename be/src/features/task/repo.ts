import { and, eq, ilike } from "drizzle-orm";

import { handleQueryError, takeFirst } from "../../utils/common";
import type { TaskInsert, TaskSelect } from "./types";
import { Task } from "./models";
import { db } from "../../db";

class TaskRepo {
  async findManyByKey<K extends keyof TaskSelect>(
    key: K,
    value: TaskSelect[K],
    isEqual: boolean = false,
    projectId?: number,
  ): Promise<TaskSelect[]> {
    let condition = isEqual
      ? eq(Task[key], value)
      : ilike(Task[key], `${value}%`);

    if (projectId) {
      condition = and(eq(Task.projectId, projectId), condition)!;
    }

    return db.select().from(Task).where(condition).catch(handleQueryError);
  }

  async findOneByKey<K extends keyof TaskSelect>(
    key: K,
    value: TaskSelect[K],
    projectId?: number,
  ): Promise<TaskSelect | null> {
    let condition = eq(Task[key], value);

    if (projectId) {
      condition = and(eq(Task.projectId, projectId), condition)!;
    }

    return db
      .select()
      .from(Task)
      .where(condition)
      .then(takeFirst)
      .catch(handleQueryError);
  }

  async create(
    payload: Omit<TaskInsert, "createdAt" | "updatedAt">,
  ): Promise<TaskSelect> {
    return db
      .insert(Task)
      .values(payload)
      .returning()
      .then(takeFirst)
      .catch(handleQueryError);
  }

  async update(
    payload: Partial<
      Omit<TaskInsert, "projectId" | "createdAt" | "creatorId">
    > &
      Required<{
        updatedAt: TaskInsert["updatedAt"];
      }>,
  ): Promise<TaskSelect> {
    return db
      .update(Task)
      .set(payload)
      .returning()
      .then(takeFirst)
      .catch(handleQueryError);
  }

  async delete(id: number): Promise<TaskSelect> {
    return db
      .delete(Task)
      .where(eq(Task.id, id))
      .returning()
      .then(takeFirst)
      .catch(handleQueryError);
  }
}

export const taskRepo = new TaskRepo();

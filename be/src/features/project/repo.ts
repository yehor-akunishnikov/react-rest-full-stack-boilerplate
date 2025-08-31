import { eq, ilike } from "drizzle-orm";

import { handleQueryError, takeFirst } from "../../utils/common";
import type { ProjectInsert, ProjectSelect } from "./types";
import { Project } from "./models";
import { db } from "../../db";

class ProjectRepo {
  async findManyByKey<K extends keyof ProjectSelect>(
    key: K,
    value: ProjectSelect[K],
    isEqual: boolean = false,
  ): Promise<ProjectSelect[]> {
    const condition = isEqual
      ? eq(Project[key], value)
      : ilike(Project[key], `${value}%`);

    return db.select().from(Project).where(condition).catch(handleQueryError);
  }

  async findOneByKey<K extends keyof ProjectSelect>(
    key: K,
    value: ProjectSelect[K],
  ): Promise<ProjectSelect | null> {
    return db
      .select()
      .from(Project)
      .where(eq(Project[key], value))
      .then(takeFirst)
      .catch(handleQueryError);
  }

  async create(
    payload: Omit<ProjectInsert, "createdAt" | "updatedAt">,
  ): Promise<ProjectSelect> {
    return db
      .insert(Project)
      .values(payload)
      .returning()
      .then(takeFirst)
      .catch(handleQueryError);
  }

  async update(
    payload: Partial<Omit<ProjectInsert, "createdAt">> &
      Required<{
        updatedAt: ProjectInsert["updatedAt"];
      }>,
  ): Promise<ProjectSelect> {
    return db
      .update(Project)
      .set(payload)
      .returning()
      .then(takeFirst)
      .catch(handleQueryError);
  }

  async delete(id: number): Promise<ProjectSelect> {
    return db
      .delete(Project)
      .where(eq(Project.id, id))
      .returning()
      .then(takeFirst)
      .catch(handleQueryError);
  }
}

export const projectRepo = new ProjectRepo();

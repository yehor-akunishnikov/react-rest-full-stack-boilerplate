import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { Project } from "../project/models";
import { User } from "../user/models";

export const taskStatus = pgEnum("task_status", [
  "TO DO",
  "IN PROGRESS",
  "COMPLETED",
]);

export const Task = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  status: taskStatus().notNull().default("TO DO"),
  projectId: integer()
    .notNull()
    .references(() => Project.id),
  creatorId: integer()
    .notNull()
    .references(() => User.id),
  assigneeId: integer().references(() => User.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

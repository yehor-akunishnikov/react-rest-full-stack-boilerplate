import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { projectSchema } from "../project/schema";
import { taskSchema } from "../task/schema";

export const listSchema = pgTable("lists", {
  id: uuid().notNull().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  projectId: uuid()
    .references(() => projectSchema.id, { onDelete: "cascade" })
    .notNull(),
  order: integer().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const listRelations = relations(listSchema, ({ one, many }) => ({
  project: one(projectSchema, {
    fields: [listSchema.projectId],
    references: [projectSchema.id],
  }),
  task: many(taskSchema),
}));

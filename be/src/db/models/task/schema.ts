import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { listSchema } from "../list/schema";
import { userSchema } from "../user/schema";

export const taskSchema = pgTable("tasks", {
  id: uuid().notNull().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1020 }).notNull(),
  order: integer().notNull(),
  listId: uuid()
    .references(() => listSchema.id, { onDelete: "cascade" })
    .notNull(),
  createdBy: uuid()
    .references(() => userSchema.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const taskRelations = relations(taskSchema, ({ one }) => ({
  projectList: one(listSchema, {
    fields: [taskSchema.listId],
    references: [listSchema.id],
  }),
  creator: one(userSchema, {
    fields: [taskSchema.createdBy],
    references: [userSchema.id],
  }),
}));

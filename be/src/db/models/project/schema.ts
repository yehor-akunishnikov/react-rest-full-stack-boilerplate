import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { userToProjectSchema } from "../../references/schema";

export const projectSchema = pgTable("projects", {
  id: uuid("project_id").primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 510 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const projectRelations = relations(projectSchema, ({ many }) => ({
  projectsToUsers: many(userToProjectSchema),
}));

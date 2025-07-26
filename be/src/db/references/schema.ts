import { pgEnum, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { projectSchema } from "../models/project/schema";
import { userSchema } from "../models/user/schema";

export const memberKindEnum = pgEnum("member_kind", ["ADMIN", "COMMON"]);

export const userToProjectSchema = pgTable(
  "users_to_projects",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => userSchema.id, { onDelete: "cascade" })
      .notNull(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projectSchema.id, { onDelete: "cascade" })
      .notNull(),
    memberKind: memberKindEnum().default("COMMON").notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.projectId] })],
);

export const userToProjectRelations = relations(
  userToProjectSchema,
  ({ one }) => ({
    user: one(userSchema, {
      fields: [userToProjectSchema.userId],
      references: [userSchema.id],
    }),
    project: one(projectSchema, {
      fields: [userToProjectSchema.projectId],
      references: [projectSchema.id],
    }),
  }),
);

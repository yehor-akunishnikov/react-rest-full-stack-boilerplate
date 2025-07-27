import { pgEnum, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { projectSchema } from "../models/project/schema";
import { userSchema } from "../models/user/schema";

export const memberKindEnum = pgEnum("member_kind", ["ADMIN", "COMMON"]);

export const membershipSchema = pgTable(
  "membership",
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

export const membershipRelations = relations(membershipSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [membershipSchema.userId],
    references: [userSchema.id],
  }),
  project: one(projectSchema, {
    fields: [membershipSchema.projectId],
    references: [projectSchema.id],
  }),
}));

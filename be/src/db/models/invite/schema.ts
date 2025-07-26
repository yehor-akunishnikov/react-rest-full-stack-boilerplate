import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { projectSchema } from "../project/schema";
import { userSchema } from "../user/schema";
import { relations } from "drizzle-orm";

export const inviteStatusEnum = pgEnum("status", [
  "PENDING",
  "ACCEPTED",
  "EXPIRED",
]);
export const kindToSetEnum = pgEnum("member_kind", ["ADMIN", "COMMON"]);

export const inviteSchema = pgTable("invites", {
  id: uuid().notNull().defaultRandom().primaryKey(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projectSchema.id, { onDelete: "cascade" }),
  inviterId: uuid("inviter_id")
    .notNull()
    .references(() => userSchema.id, { onDelete: "cascade" }),
  token: varchar({ length: 255 }).notNull().unique(),
  status: inviteStatusEnum().default("PENDING").notNull(),
  kindToSet: kindToSetEnum().default("COMMON").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const inviteRelations = relations(inviteSchema, ({ one }) => ({
  project: one(projectSchema, {
    fields: [inviteSchema.projectId],
    references: [projectSchema.id],
  }),
  inviter: one(userSchema, {
    fields: [inviteSchema.inviterId],
    references: [userSchema.id],
  }),
}));

import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { userToProjectSchema } from "../../references/schema";
import { inviteSchema } from "../invite/schema";

export const userSchema = pgTable("users", {
  id: uuid().notNull().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userRelations = relations(userSchema, ({ many }) => ({
  usersToProjects: many(userToProjectSchema),
  inviterToInvites: many(inviteSchema),
}));

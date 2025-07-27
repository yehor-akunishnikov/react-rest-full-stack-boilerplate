import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { membershipSchema } from "../../references/schema";
import { inviteSchema } from "../invite/schema";
import { listSchema } from "../list/schema";

export const projectSchema = pgTable("projects", {
  id: uuid().notNull().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 510 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const projectRelations = relations(projectSchema, ({ many }) => ({
  membership: many(membershipSchema),
  invite: many(inviteSchema),
  list: many(listSchema),
}));

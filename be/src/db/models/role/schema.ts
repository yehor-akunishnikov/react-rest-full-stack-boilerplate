import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { rolesToPermissionsSchema } from "../../references/schema";

export const roleSchema = pgTable("roles", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const rolesRelations = relations(roleSchema, ({ many }) => ({
  rolesToPermissions: many(rolesToPermissionsSchema),
}));

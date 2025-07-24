import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { rolesToPermissionsSchema } from "../../references/schema";

export const permissionSchema = pgTable("permissions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const permissionsRelations = relations(permissionSchema, ({ many }) => ({
  permissionsToRoles: many(rolesToPermissionsSchema),
}));

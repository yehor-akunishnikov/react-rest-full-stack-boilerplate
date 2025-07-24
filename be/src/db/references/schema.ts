import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { permissionSchema } from "../models/permission/schema";
import { roleSchema } from "../models/role/schema";

export const rolesToPermissionsSchema = pgTable(
  "roles_to_permissions",
  {
    roleId: integer("role_id")
      .notNull()
      .references(() => roleSchema.id, { onDelete: "cascade" })
      .notNull(),
    permissionId: integer("permission_id")
      .notNull()
      .references(() => permissionSchema.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.roleId, t.permissionId] })],
);

export const rolesToPermissionsRelations = relations(
  rolesToPermissionsSchema,
  ({ one }) => ({
    permission: one(permissionSchema, {
      fields: [rolesToPermissionsSchema.permissionId],
      references: [permissionSchema.id],
    }),
    role: one(roleSchema, {
      fields: [rolesToPermissionsSchema.roleId],
      references: [roleSchema.id],
    }),
  }),
);

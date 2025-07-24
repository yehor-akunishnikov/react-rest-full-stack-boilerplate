import { permissionSchema } from "./schema";

export type PermissionSelect = typeof permissionSchema.$inferSelect;
export type PermissionInsert = typeof permissionSchema.$inferInsert;

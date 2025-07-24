import { roleSchema } from "./schema";

export type RoleSelect = typeof roleSchema.$inferSelect;
export type RoleInsert = typeof roleSchema.$inferInsert;

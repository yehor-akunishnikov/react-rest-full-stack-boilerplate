import { rolesToPermissionsSchema } from "./schema";

export type RolesToPermissionsSelect =
  typeof rolesToPermissionsSchema.$inferSelect;
export type RolesToPermissionsInsert =
  typeof rolesToPermissionsSchema.$inferInsert;

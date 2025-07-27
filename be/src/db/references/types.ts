import { membershipSchema } from "./schema";

export type UserToProjectSelect = typeof membershipSchema.$inferSelect;
export type UserToProjectInsert = typeof membershipSchema.$inferInsert;

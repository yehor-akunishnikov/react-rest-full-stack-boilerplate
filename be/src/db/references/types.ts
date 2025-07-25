import { userToProjectSchema } from "./schema";

export type UserToProjectSelect = typeof userToProjectSchema.$inferSelect;
export type UserToProjectInsert = typeof userToProjectSchema.$inferInsert;

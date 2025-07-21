import { userSchema } from "./schema";

export type UserSelect = typeof userSchema.$inferSelect;
export type UserInsert = typeof userSchema.$inferInsert;

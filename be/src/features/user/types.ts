import { User } from "./models";

export type UserSelect = typeof User.$inferSelect;
export type UserInsert = typeof User.$inferInsert;

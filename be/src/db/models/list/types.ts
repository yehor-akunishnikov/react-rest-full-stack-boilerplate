import { listSchema } from "./schema";

export type ListSelect = typeof listSchema.$inferSelect;
export type ListInsert = typeof listSchema.$inferInsert;

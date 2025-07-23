import { projectSchema } from "./schema";

export type ProjectSelect = typeof projectSchema.$inferSelect;
export type ProjectInsert = typeof projectSchema.$inferInsert;

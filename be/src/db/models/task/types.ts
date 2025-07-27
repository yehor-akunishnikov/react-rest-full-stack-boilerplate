import { taskSchema } from "./schema";

export type TaskSelect = typeof taskSchema.$inferSelect;
export type TaskInsert = typeof taskSchema.$inferInsert;

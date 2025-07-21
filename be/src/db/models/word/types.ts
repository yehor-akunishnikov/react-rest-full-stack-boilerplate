import { wordSchema } from "./schema";

export type WordSelect = typeof wordSchema.$inferSelect;
export type WordInsert = typeof wordSchema.$inferInsert;

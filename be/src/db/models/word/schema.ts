import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { userSchema } from "../user/schema";

export const wordSchema = pgTable("words", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  authorId: integer("author_id").references(() => userSchema.id, {
    onDelete: "cascade",
  }),
  spelling: varchar({ length: 255 }).notNull(),
});

export const wordRelations = relations(wordSchema, ({ one, many }) => ({
  author: one(userSchema, {
    fields: [wordSchema.authorId],
    references: [userSchema.id],
  }),
}));

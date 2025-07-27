import { z } from "zod/v4";

export const createListValidator = z.strictObject({
  title: z.string().nonempty().max(255),
  order: z.number(),
});

export type CreateListPayload = z.infer<typeof createListValidator>;

export const updateListValidator = z.strictObject({
  title: z.string().nonempty().max(255).optional(),
  order: z.number().optional(),
});

export type UpdateListPayload = z.infer<typeof updateListValidator>;

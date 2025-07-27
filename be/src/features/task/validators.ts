import { z } from "zod/v4";

export const createTaskValidator = z.strictObject({
  title: z.string().nonempty().max(255),
  description: z.string().nonempty().max(1020),
  listId: z.uuid(),
  order: z.number(),
});

export type CreateTaskPayload = z.infer<typeof createTaskValidator>;

export const updateTaskValidator = z.strictObject({
  title: z.string().nonempty().max(255).optional(),
  description: z.string().nonempty().max(1020).optional(),
  listId: z.uuid().optional(),
  order: z.number().optional(),
});

export type UpdateTaskPayload = z.infer<typeof updateTaskValidator>;

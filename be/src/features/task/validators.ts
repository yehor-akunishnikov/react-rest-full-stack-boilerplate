import { z } from "zod/v4";

import { taskStatus } from "./models";

export const createTaskValidator = z.strictObject({
  name: z.string().nonempty(),
  status: z.enum(taskStatus.enumValues).default("TO DO"),
  creatorId: z.int32(),
  assigneeId: z.int32().optional(),
});

export type CreateTaskDTO = z.infer<typeof createTaskValidator>;

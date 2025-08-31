import { z } from "zod/v4";

export const createProjectValidator = z.strictObject({
  name: z.string().nonempty(),
});

export type CreateProjectDTO = z.infer<typeof createProjectValidator>;

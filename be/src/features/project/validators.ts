import { z } from "zod/v4";

export const createProjectValidator = z.strictObject({
  name: z.string().nonempty().max(255),
  description: z.string().nonempty().max(510),
});

export type CreateProjectPayload = z.infer<typeof createProjectValidator>;

export const updateProjectValidator = z.object({
  name: z.string().nonempty().max(255),
  description: z.string().nonempty().max(510),
});

export type UpdateProjectPayload = z.infer<typeof updateProjectValidator>;

export const projectGetAllQueryParamsValidator = z.object({
  search: z.string().optional(),
  limit: z.coerce.number().optional(),
});

export type ProjectGetAllQueryParams = z.infer<
  typeof projectGetAllQueryParamsValidator
>;

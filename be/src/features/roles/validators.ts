import { z } from "zod/v4";

export const createRoleValidator = z.strictObject({
  name: z.string().nonempty().max(255),
});

export type CreateRolePayload = z.infer<typeof createRoleValidator>;

export const updateRoleValidator = z.object({
  name: z.string().nonempty().max(255),
});

export type UpdateRolePayload = z.infer<typeof updateRoleValidator>;

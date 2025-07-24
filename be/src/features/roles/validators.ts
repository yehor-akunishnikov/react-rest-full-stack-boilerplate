import { z } from "zod/v4";

export const createRoleValidator = z.strictObject({
  name: z.string().nonempty().max(255),
});

export type CreateRolePayload = z.infer<typeof createRoleValidator>;

export const updateRoleValidator = z.object({
  name: z.string().nonempty().max(255),
});

export type UpdateRolePayload = z.infer<typeof updateRoleValidator>;

export const assignPermissionsValidator = z.strictObject({
  ids: z.array(z.number()).min(1),
});

export type AssignPermissionsPayload = z.infer<
  typeof assignPermissionsValidator
>;

export const revokePermissionsValidator = z.strictObject({
  ids: z.array(z.number()).min(1),
});

export type RevokePermissionsPayload = z.infer<
  typeof revokePermissionsValidator
>;

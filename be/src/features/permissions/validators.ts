import { z } from "zod/v4";

export const createPermissionValidator = z.strictObject({
  name: z.string().nonempty().max(255),
});

export type CreatePermissionPayload = z.infer<typeof createPermissionValidator>;

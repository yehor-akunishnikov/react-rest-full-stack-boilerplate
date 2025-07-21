import { z } from "zod/v4";

import { strongPassword } from "../../constants/regexp";

export const registerValidator = z.strictObject({
  email: z.email({ error: "Invalid email" }),
  name: z
    .string()
    .nonempty({ error: "Required" })
    .max(12, { error: "Too long" }),
  password: z
    .string()
    .nonempty({ error: "Required" })
    .refine((val: string) => strongPassword.test(val), { error: "Too weak" }),
});

export type RegisterPayload = z.infer<typeof registerValidator>;

export const loginValidator = z.strictObject({
  email: z.email({ error: "Invalid email" }),
  password: z.string().nonempty({ error: "Required" }),
});

export type LoginPayload = z.infer<typeof loginValidator>;

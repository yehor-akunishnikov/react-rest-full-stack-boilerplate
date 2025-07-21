import { z } from "zod/v4";

export const createWordValidator = z.strictObject({
  spelling: z
    .string()
    .nonempty({ error: "Required" })
    .max(45, { error: "Too long" }),
});

export const getAllQueryParamsValidator = z.strictObject({
  search: z.string().optional().default(""),
});

export type GetAllQueryParams = z.infer<typeof getAllQueryParamsValidator>;
export type CreateWordPayload = z.infer<typeof createWordValidator>;

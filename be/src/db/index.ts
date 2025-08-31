import { drizzle } from "drizzle-orm/node-postgres";

import * as projectSchema from "../features/project/models";
import * as userSchema from "../features/user/models";

import config from "../config";

export const db = drizzle(config.dbUrl, {
  schema: {
    ...userSchema,
    ...projectSchema,
  },
});

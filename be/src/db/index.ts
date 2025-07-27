import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./models/schema";
import * as references from "./references/schema";

import config from "../config";

export const db = drizzle(config.dbUrl, {
  schema: {
    ...schema,
    ...references,
  },
});

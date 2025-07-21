import { defineConfig } from "drizzle-kit";

import config from "./src/config";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/models/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: config.dbUrl,
  },
});

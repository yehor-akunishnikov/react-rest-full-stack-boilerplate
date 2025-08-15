import { DataSource } from "typeorm";

import { User } from "../features/user";
import config from "../config";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: config.dbUrl,
  synchronize: true,
  logging: true,
  entities: [User],
});

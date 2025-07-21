import * as dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

class Config {
  /* General */
  public readonly port: number = Number(process.env.PORT) ?? 3000;
  public readonly env: string = process.env.NODE_ENV ?? "development";

  /* Database */
  public readonly dbUrl: string = process.env.DB_URL!;

  /* Auth */
  public readonly authSecret: string = process.env.AUTH_SECRET!;
}

export default new Config();

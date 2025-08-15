import "reflect-metadata";

import express from "express";
import path from "node:path";

import { errorHandlerMW } from "./middleware";
import { AppDataSource } from "./db";
import config from "./config";

import { authRouter } from "./features/auth";
import { userRouter } from "./features/user";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use(express.static(path.join(process.cwd(), "assets")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "assets", "index.html"));
});

app.use(errorHandlerMW);

app.listen(config.port, async () => {
  try {
    await AppDataSource.initialize();

    console.log(
      `Server running on port ${config.port}. Open: http://localhost:${config.port}`,
    );
  } catch (e) {
    console.error("Unable to connect to the database:", e);
  }
});

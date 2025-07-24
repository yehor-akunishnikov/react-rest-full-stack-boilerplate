import "reflect-metadata";

import express from "express";
import path from "node:path";

import { errorHandlerMW } from "./middleware/errorHandler";
import permissionRouter from "./features/permissions";
import projectRouter from "./features/project";
import roleRouter from "./features/roles";
import authRouter from "./features/auth";
import userRouter from "./features/user";
import config from "./config";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/roles", roleRouter);
app.use("/api/permissions", permissionRouter);

app.use(express.static(path.join(process.cwd(), "assets")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "assets", "index.html"));
});

app.use(errorHandlerMW);

app.listen(config.port, () => {
  console.log(
    `Server running on port ${config.port}. Open: http://localhost:${config.port}`,
  );
});

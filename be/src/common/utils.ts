import { Handler, Router } from "express";

import { Controller } from "./types";

export type ControllerMiddlewares = Record<string, Handler[]>;

export type SetupControllerOptions = {
  middlewares?: ControllerMiddlewares;
};

export function setupController(
  controller: Controller,
  options?: SetupControllerOptions,
): Router {
  const router = Router();

  router.use("/", (req, res, next) => {
    console.log(`Request at: [${req.originalUrl}]`);
    return next();
  });

  if (options?.middlewares) {
    const middlewareList: Handler[] = [];

    Object.values(options.middlewares).forEach((middlewares) => {
      middlewareList.push(...middlewares);
    });

    router.use(...middlewareList);
  }

  controller.forEach(([meta, handlers]) => {
    const [method, path] = meta;

    router[method](path, ...handlers);
  });

  return router;
}

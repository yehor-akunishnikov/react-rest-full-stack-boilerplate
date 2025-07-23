import { Handler } from "express";

import { HTTP_METHOD } from "./http";

export type ControllerHandler = [[HTTP_METHOD, string], Handler[]];

export type Controller = ControllerHandler[];

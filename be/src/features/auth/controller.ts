import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../types";
import { setupController } from "../../utils";
import { AppError } from "../../errors";

import { loginValidator, registerValidator } from "./validators";
import { authService } from "./service";

export const authRouter = setupController([
  [
    [HTTP_METHOD.POST, "/login"],
    [
      async function login(req, res) {
        const payload = loginValidator.parse(req.body);
        const token = await authService.login(payload);

        if (token) {
          res.status(HTTP_STATUS_CODE.OK).json({ token });
        } else {
          throw new AppError("Failed to login", HTTP_STATUS_CODE.UNAUTHORIZED);
        }
      },
    ],
  ],
  [
    [HTTP_METHOD.POST, "/register"],
    [
      async function register(req, res) {
        const payload = registerValidator.parse(req.body);

        await authService.register(payload);

        res
          .status(HTTP_STATUS_CODE.CREATED)
          .json({ message: "Successfully registered" });
      },
    ],
  ],
]);

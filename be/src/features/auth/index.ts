import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../common/types";
import { loginValidator, registerValidator } from "./validators";
import { setupController } from "../../common/utils";
import * as userService from "./service";

export default setupController([
  [
    [HTTP_METHOD.POST, "/login"],
    [
      async function login(req, res) {
        const payload = loginValidator.parse(req.body);

        const token = await userService.login(payload);

        if (token) {
          res.status(HTTP_STATUS_CODE.OK).json({ token });
        } else {
          res
            .status(HTTP_STATUS_CODE.UNAUTHORIZED)
            .json({ message: "Failed to login" });
        }
      },
    ],
  ],
  [
    [HTTP_METHOD.POST, "/register"],
    [
      async function register(req, res) {
        const payload = registerValidator.parse(req.body);

        await userService.register(payload);

        res
          .status(HTTP_STATUS_CODE.CREATED)
          .json({ message: "Successfully registered" });
      },
    ],
  ],
]);

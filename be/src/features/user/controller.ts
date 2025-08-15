import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../types";
import { getAuthData, setupController } from "../../utils";
import { AppError } from "../../errors";
import { authMW } from "../auth";

import { userService } from "./service";
import { currentUserDto } from "./dto";

export const userRouter = setupController([
  [
    [HTTP_METHOD.GET, "/me"],
    [
      authMW(),
      async function getMe(req, res) {
        const userData = await userService.findById(getAuthData(res).userId);

        if (!userData)
          throw new AppError("Not found", HTTP_STATUS_CODE.NOT_FOUND);

        res.status(HTTP_STATUS_CODE.OK).json(currentUserDto(userData));
      },
    ],
  ],
]);

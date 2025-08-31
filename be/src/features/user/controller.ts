import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../types/http";
import { setupController } from "../../utils/controller";
import { getAuthData } from "../../utils/common";
import { authMW } from "../../middleware/auth";
import { AppError } from "../../errors";
import { currentUserDto } from "./dto";
import { userRepo } from "./repo";

export const userRouter = setupController([
  [
    [HTTP_METHOD.GET, "/me"],
    [
      authMW(),
      async function getMe(req, res) {
        const userData = await userRepo.findOneByKey(
          "id",
          getAuthData(res).userId,
        );

        if (!userData)
          throw new AppError("Not found", HTTP_STATUS_CODE.NOT_FOUND);

        res.status(HTTP_STATUS_CODE.OK).json(currentUserDto(userData));
      },
    ],
  ],
]);

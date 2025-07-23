import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../types/http";
import { setupController } from "../../utils/controller";
import { getAuthData } from "../../utils/common";
import { authMW } from "../../middleware/auth";
import { currentUserDto } from "./dto";
import * as userRepo from "./repo";

export default setupController([
  [
    [HTTP_METHOD.GET, "/me"],
    [
      authMW,
      async function getMe(req, res) {
        const userData = await userRepo.findById(getAuthData(res).userId);

        res.status(HTTP_STATUS_CODE.OK).json(currentUserDto(userData));
      },
    ],
  ],
]);

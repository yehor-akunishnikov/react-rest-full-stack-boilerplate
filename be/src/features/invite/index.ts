import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../types/http";
import { setupController } from "../../utils/controller";
import { getAuthData } from "../../utils/common";
import { authMW } from "../../middleware/auth";
import * as inviteService from "./service";

export default setupController([
  [
    [HTTP_METHOD.GET, "/:token"],
    [
      authMW,
      async function getInvite(req, res) {
        const invite = await inviteService.getByToken(req.params.token);

        res.status(HTTP_STATUS_CODE.OK).json(invite);
      },
    ],
  ],
  [
    [HTTP_METHOD.POST, "/:id"],
    [
      authMW,
      async function acceptInvite(req, res) {
        const { projectId } = await inviteService.acceptInvite(
          getAuthData(res).userId,
          req.params.id,
        );

        res.status(HTTP_STATUS_CODE.OK).json({ projectId });
      },
    ],
  ],
]);

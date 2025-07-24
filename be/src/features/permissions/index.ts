import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../types/http";
import { createPermissionValidator } from "./validators";
import { setupController } from "../../utils/controller";
import { authMW } from "../../middleware/auth";
import * as permissionService from "./service";

export default setupController([
  [
    [HTTP_METHOD.POST, "/"],
    [
      authMW,
      async function create(req, res) {
        const payload = createPermissionValidator.parse(req.body);
        const result = await permissionService.create(payload);

        res.status(HTTP_STATUS_CODE.CREATED).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.GET, "/"],
    [
      authMW,
      async function getAll(req, res) {
        const result = await permissionService.getAll();

        res.status(HTTP_STATUS_CODE.OK).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.DELETE, "/:permissionId"],
    [
      authMW,
      async function remove(req, res) {
        await permissionService.remove(Number(req.params.permissionId));

        res
          .status(HTTP_STATUS_CODE.OK)
          .json({ message: "Successfully deleted" });
      },
    ],
  ],
]);

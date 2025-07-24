import { createRoleValidator, updateRoleValidator } from "./validators";
import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../types/http";
import { setupController } from "../../utils/controller";
import { authMW } from "../../middleware/auth";
import * as roleService from "./service";

export default setupController([
  [
    [HTTP_METHOD.POST, "/"],
    [
      authMW,
      async function create(req, res) {
        const payload = createRoleValidator.parse(req.body);
        const result = await roleService.create(payload);

        res.status(HTTP_STATUS_CODE.CREATED).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.GET, "/"],
    [
      authMW,
      async function getAll(req, res) {
        const result = await roleService.getAll();

        res.status(HTTP_STATUS_CODE.OK).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.GET, "/:id/permissions"],
    [
      authMW,
      async function getPermissions(req, res) {
        const result = await roleService.getPermissions(Number(req.params.id));

        res.status(HTTP_STATUS_CODE.OK).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.GET, "/:id"],
    [
      authMW,
      async function getById(req, res) {
        const result = await roleService.getById(req.params.id);

        res.status(HTTP_STATUS_CODE.OK).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.PUT, "/:id"],
    [
      authMW,
      async function update(req, res) {
        const payload = updateRoleValidator.parse(req.body);
        const result = await roleService.update(req.params.id, payload);

        res.status(HTTP_STATUS_CODE.OK).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.DELETE, "/:id"],
    [
      authMW,
      async function remove(req, res) {
        await roleService.remove(Number(req.params.id));

        res
          .status(HTTP_STATUS_CODE.OK)
          .json({ message: "Successfully deleted" });
      },
    ],
  ],
  [
    [HTTP_METHOD.PUT, "/:roleId/:permissionId"],
    [
      authMW,
      async function assignPermission(req, res) {
        await roleService.assignPermission(
          Number(req.params.roleId),
          Number(req.params.permissionId),
        );

        res
          .status(HTTP_STATUS_CODE.OK)
          .json({ message: "Successfully assigned" });
      },
    ],
  ],
  [
    [HTTP_METHOD.DELETE, "/:roleId/:permissionId"],
    [
      authMW,
      async function revokePermission(req, res) {
        await roleService.revokePermission(
          Number(req.params.roleId),
          Number(req.params.permissionId),
        );

        res
          .status(HTTP_STATUS_CODE.OK)
          .json({ message: "Successfully revoked" });
      },
    ],
  ],
]);

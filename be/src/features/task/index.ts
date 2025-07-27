import { createTaskValidator, updateTaskValidator } from "./validators";
import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../types/http";
import { membershipMW } from "../../middleware/membership";
import { setupController } from "../../utils/controller";
import { getAuthData } from "../../utils/common";
import { authMW } from "../../middleware/auth";
import * as listService from "./service";

export default setupController([
  [
    [HTTP_METHOD.GET, "/:listId"],
    [
      authMW,
      membershipMW(),
      async function getAll(req, res) {
        const result = await listService.getAll(req.params.listId);

        res.status(HTTP_STATUS_CODE.CREATED).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.POST, "/"],
    [
      authMW,
      membershipMW(),
      async function createList(req, res) {
        const payload = createTaskValidator.parse(req.body);
        const result = await listService.create(
          getAuthData(res).userId,
          payload,
        );

        res.status(HTTP_STATUS_CODE.CREATED).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.PATCH, "/:id"],
    [
      authMW,
      membershipMW(),
      async function createList(req, res) {
        const payload = updateTaskValidator.parse(req.body);
        const result = await listService.update(req.params.id, payload);

        res.status(HTTP_STATUS_CODE.OK).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.DELETE, "/:id"],
    [
      authMW,
      membershipMW(),
      async function createList(req, res) {
        await listService.remove(req.params.id);

        res
          .status(HTTP_STATUS_CODE.OK)
          .json({ message: "Successfully deleted" });
      },
    ],
  ],
]);

import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../types/http";
import { setupController } from "../../utils/controller";
import { getAuthData } from "../../utils/common";
import { authMW } from "../../middleware/auth";
import * as projectService from "./service";
import {
  createProjectValidator,
  projectGetAllQueryParamsValidator,
  updateProjectValidator,
} from "./validators";

export default setupController([
  [
    [HTTP_METHOD.POST, "/"],
    [
      authMW,
      async function create(req, res) {
        const payload = createProjectValidator.parse(req.body);
        const result = await projectService.create(
          getAuthData(res).userId,
          payload,
        );

        res.status(HTTP_STATUS_CODE.CREATED).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.GET, "/"],
    [
      authMW,
      async function getAll(req, res) {
        const query = projectGetAllQueryParamsValidator.parse(req.query);
        const result = await projectService.getAll(query);

        res.status(HTTP_STATUS_CODE.OK).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.GET, "/:id"],
    [
      authMW,
      async function getById(req, res) {
        const result = await projectService.getById(req.params.id);

        res.status(HTTP_STATUS_CODE.OK).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.PUT, "/:id"],
    [
      authMW,
      async function update(req, res) {
        const payload = updateProjectValidator.parse(req.body);
        const result = await projectService.update(req.params.id, payload);

        res.status(HTTP_STATUS_CODE.OK).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.DELETE, "/:id"],
    [
      authMW,
      async function remove(req, res) {
        await projectService.remove(req.params.id);

        res
          .status(HTTP_STATUS_CODE.OK)
          .json({ message: "Successfully deleted" });
      },
    ],
  ],
]);

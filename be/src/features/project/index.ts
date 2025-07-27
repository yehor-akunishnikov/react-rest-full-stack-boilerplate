import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../types/http";
import { membershipMW } from "../../middleware/membership";
import { setupController } from "../../utils/controller";
import { getAuthData } from "../../utils/common";
import { authMW } from "../../middleware/auth";
import * as projectService from "./service";
import {
  createProjectValidator,
  projectGetAllQueryParamsValidator,
  updateProjectValidator,
} from "./validators";

import listRouter from "../list";
import taskRouter from "../task";

const router = setupController([
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
        const result = await projectService.getAll(
          getAuthData(res).userId,
          query,
        );

        res.status(HTTP_STATUS_CODE.OK).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.GET, "/:projectId"],
    [
      authMW,
      membershipMW(),
      async function getById(req, res) {
        const result = await projectService.getById(req.params.projectId);

        res.status(HTTP_STATUS_CODE.OK).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.PATCH, "/:projectId"],
    [
      authMW,
      membershipMW("ADMIN"),
      async function update(req, res) {
        const payload = updateProjectValidator.parse(req.body);
        const result = await projectService.update(
          req.params.projectId,
          payload,
        );

        res.status(HTTP_STATUS_CODE.OK).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.DELETE, "/:projectId"],
    [
      authMW,
      membershipMW("ADMIN"),
      async function remove(req, res) {
        await projectService.remove(req.params.projectId);

        res
          .status(HTTP_STATUS_CODE.OK)
          .json({ message: "Successfully deleted" });
      },
    ],
  ],
  [
    [HTTP_METHOD.GET, "/:projectId/invite"],
    [
      authMW,
      membershipMW("ADMIN"),
      async function createInvite(req, res) {
        const inviteUrl = await projectService.createInvite(
          req.params.projectId,
          getAuthData(res).userId,
        );

        res.status(HTTP_STATUS_CODE.CREATED).json({ inviteUrl });
      },
    ],
  ],
]);

router.use("/:projectId/lists", listRouter);
router.use("/:projectId/tasks", taskRouter);

export default router;

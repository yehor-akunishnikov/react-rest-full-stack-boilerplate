import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../types/http";
import { setupController } from "../../utils/controller";
import { createProjectValidator } from "./validators";
import { projectService } from "./service";

export const projectRouter = setupController([
  [
    [HTTP_METHOD.POST, "/"],
    [
      async function create(req, res) {
        const payload = createProjectValidator.parse(req.body);
        const project = await projectService.create(payload);

        res.status(HTTP_STATUS_CODE.OK).json(project);
      },
    ],
  ],
]);

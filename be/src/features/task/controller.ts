import { z } from "zod/v4";

import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../types/http";
import { setupController } from "../../utils/controller";
import { createTaskValidator } from "./validators";
import { taskService } from "./service";

export const taskRouter = setupController([
  [
    [HTTP_METHOD.POST, "/:projectId"],
    [
      async function create(req, res) {
        const payload = createTaskValidator.parse(req.body);
        const params = z
          .strictObject({
            projectId: z.coerce.number(),
          })
          .parse(req.params);

        const task = await taskService.create(params.projectId, payload);

        res.status(HTTP_STATUS_CODE.OK).json(task);
      },
    ],
  ],
]);

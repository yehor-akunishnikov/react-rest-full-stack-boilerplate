import { HTTP_METHOD, HTTP_STATUS_CODE } from "../../common/types";
import { setupController } from "../../common/utils";
import { createWordValidator, getAllQueryParamsValidator } from "./validators";
import { authMW } from "../../middleware/auth";
import * as wordService from "./service";

export default setupController([
  [
    [HTTP_METHOD.POST, "/"],
    [
      authMW,
      async function create(req, res) {
        const payload = createWordValidator.parse(req.body);

        const result = await wordService.create(payload, res.locals.userId);

        res.status(HTTP_STATUS_CODE.CREATED).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.GET, "/"],
    [
      authMW,
      async function getById(req, res) {
        const query = getAllQueryParamsValidator.parse(req.query);
        const result = await wordService.getAll(query);

        res.status(HTTP_STATUS_CODE.OK).json(result);
      },
    ],
  ],
  [
    [HTTP_METHOD.GET, "/:id"],
    [
      authMW,
      async function getById(req, res) {
        const id = Number(req.params.id);

        const result = await wordService.getById(id);

        res.status(HTTP_STATUS_CODE.OK).json(result);
      },
    ],
  ],
]);

import type { Handler, NextFunction, Request, Response } from "express";

import { memberKindEnum } from "../db/references/schema";
import { getMemberKind } from "../shared/repo";
import { getAuthData } from "../utils/common";
import { ForbiddenError } from "../errors";

export function membershipMW(
  kind?: (typeof memberKindEnum.enumValues)[number],
): Handler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const memberKind = await getMemberKind(
      getAuthData(res).userId,
      req.params.projectId,
    );

    if (memberKind) {
      res.locals.authData.memberKind = memberKind;

      if (!kind || memberKind === kind) {
        next();

        return;
      }
    }

    next(
      new ForbiddenError(
        `Forbidden: you must be project ${kind ? kind + " " : ""}member`,
      ),
    );
  };
}

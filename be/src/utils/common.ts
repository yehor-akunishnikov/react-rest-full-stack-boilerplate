import { Response } from "express";

import { HTTP_STATUS_CODE } from "../types";
import { AppError } from "../errors";

type ObjectKeysList<T extends object> = (keyof T)[];

type PgLikeError = Error & {
  code?: string;
  constraint?: string;
  detail?: string;
};

export function pick<T extends object, K extends ObjectKeysList<T>>(
  data: T,
  pickKeys: K,
): Pick<T, K[number]> {
  return Object.fromEntries(
    Object.entries(data).filter((entry) => {
      const key = entry[0] as keyof T;

      return pickKeys.includes(key) && data[key] !== null;
    }),
  ) as Pick<T, K[number]>;
}

export function omit<T extends object, K extends ObjectKeysList<T>>(
  data: T,
  omitKeys: K,
): Omit<T, K[number]> {
  return Object.fromEntries(
    Object.entries(data).filter((entry) => {
      const key = entry[0] as keyof T;

      return !omitKeys.includes(key) && data[key] !== null;
    }),
  ) as Omit<T, K[number]>;
}

export function setUpdatedAt<T extends Record<string, unknown>>(entity: T): T {
  return {
    ...entity,
    updatedAt: new Date(),
  };
}

export function takeFirst<T extends Array<unknown>>(list: T): T[number] {
  return list[0] ?? null;
}

export function handleQueryError(e: PgLikeError): never {
  switch (e.code) {
    case "23505": // unique_violation
      throw new AppError("Resource already exists", HTTP_STATUS_CODE.CONFLICT);
    case "23503": // foreign_key_violation
      throw new AppError(
        "Referenced resource does not exist",
        HTTP_STATUS_CODE.NOT_FOUND,
      );
    case "23502": // not_null_violation
    case "23514": // check_violation
      throw new AppError(
        "Invalid data for this resource",
        HTTP_STATUS_CODE.BAD_REQUEST,
      );
    default:
      throw new AppError(
        "Unknown query error",
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
  }
}

export function getAuthData(res: Response) {
  return res.locals.authData;
}

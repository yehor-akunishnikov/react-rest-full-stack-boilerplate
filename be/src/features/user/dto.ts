import { omit } from "../../utils";

import type { User } from "./models";

export function currentUserDto(user: User) {
  return omit(user, ["password"]);
}

export type CurrentUserDto = ReturnType<typeof currentUserDto>;

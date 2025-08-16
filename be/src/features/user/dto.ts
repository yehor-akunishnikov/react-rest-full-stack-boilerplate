import { omit } from "../../utils";

import type { UserSelect } from "./types";

export function currentUserDto(user: UserSelect) {
  return omit(user, ["password"]);
}

export type CurrentUserDto = ReturnType<typeof currentUserDto>;

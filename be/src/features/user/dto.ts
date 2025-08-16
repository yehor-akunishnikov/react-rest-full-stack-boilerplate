import { omit } from "../../utils";

import type { UserSelect } from "./types";

export function currentUserDto(user: UserSelect): Omit<UserSelect, "password"> {
  return omit(user, ["password"]);
}

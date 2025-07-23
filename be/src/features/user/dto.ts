import { UserSelect } from "../../db/models/user/types";
import { omit } from "../../utils/common";

export function currentUserDto(user: UserSelect) {
  return omit(user, ["password"]);
}

export type CurrentUserDto = ReturnType<typeof currentUserDto>;

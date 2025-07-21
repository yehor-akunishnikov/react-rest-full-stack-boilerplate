import { UserSelect } from "../../db/models/user/types";

export function currentUserDto(user: UserSelect): Omit<UserSelect, "password"> {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  };
}

export type CurrentUserDto = ReturnType<typeof currentUserDto>;

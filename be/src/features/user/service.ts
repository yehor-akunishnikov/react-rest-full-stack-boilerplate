import { User, getUserRepo } from "./models";

async function findById(id: number): Promise<User | null> {
  const userRepo = getUserRepo();

  return userRepo.findOneBy({ id });
}

async function findOneByEmail(email: string): Promise<User | null> {
  const userRepo = getUserRepo();

  return userRepo.findOneBy({ email });
}

export const userService = {
  findById,
  findOneByEmail,
};

import { Prisma } from "@prisma/client";
import { Role, User } from "shared";

export const userTransformer = (user: Prisma.userGetPayload<null>): User => {
  return { ...user, role: user.role as Role };
};

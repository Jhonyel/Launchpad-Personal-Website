import { Prisma } from "@prisma/client";
import { User } from "shared";

export const userTransformer = (user: Prisma.userGetPayload<null>): User => {
  return user;
};

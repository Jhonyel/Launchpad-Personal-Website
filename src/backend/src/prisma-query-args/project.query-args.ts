import { Prisma } from "@prisma/client";

export const projectQueryArgs = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: {
    creator: true,
  },
});

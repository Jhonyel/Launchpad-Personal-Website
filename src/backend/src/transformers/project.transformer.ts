import { Prisma } from "@prisma/client";
import { Project } from "shared";
import { projectQueryArgs } from "../prisma-query-args/project.query-args";
import { userTransformer } from "./user.transformer";

export const projectTransformer = (
  project: Prisma.ProjectGetPayload<typeof projectQueryArgs>
): Project => {
  return {
    ...project,
    url: project.githubUrl,
    creator: userTransformer(project.userCreated),
  };
};

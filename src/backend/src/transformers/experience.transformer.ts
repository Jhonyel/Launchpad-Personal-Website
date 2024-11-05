import { Prisma } from "@prisma/client";
import { Experience } from "shared";
import { experienceQueryArgs } from "../prisma-query-args/experience.query-args";
import { userTransformer } from "./user.transformer";

export const experienceTransformer = (
  experience: Prisma.ExperienceGetPayload<typeof experienceQueryArgs>
): Experience => {
  return { ...experience, creator: userTransformer(experience.userCreated) };
};

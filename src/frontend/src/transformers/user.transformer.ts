import { User } from "shared";
import { projectPreviewTransformer } from "./projects.transformer";
import { experiencePreviewTransformer } from "./experiences.transformer";

export const userTransformer = (user: User): User => {
  return {
    ...user,
    projects: user.projects.map(projectPreviewTransformer),
    experiences: user.experiences.map(experiencePreviewTransformer),
  };
};

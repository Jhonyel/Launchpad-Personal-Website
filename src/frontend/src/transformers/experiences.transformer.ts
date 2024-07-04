import { Experience, ExperiencePreview } from "shared";

export const experienceTransformer = (experience: Experience): Experience => {
  return {
    ...experience,
    createdAt: new Date(experience.createdAt),
    updatedAt: new Date(experience.updatedAt),
    startDate: new Date(experience.startDate),
    endDate: experience.endDate ? new Date(experience.endDate) : undefined,
  };
};

export const experiencePreviewTransformer = (
  experience: ExperiencePreview
): ExperiencePreview => {
  return {
    ...experience,
    createdAt: new Date(experience.createdAt),
    updatedAt: new Date(experience.updatedAt),
    startDate: new Date(experience.startDate),
    endDate: experience.endDate ? new Date(experience.endDate) : undefined,
  };
};

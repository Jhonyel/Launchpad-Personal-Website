import { Project, ProjectPreview } from "shared";

export const projectTransformer = (project: Project): Project => {
  return {
    ...project,
    createdAt: new Date(project.createdAt),
    updatedAt: new Date(project.updatedAt),
  };
};

export const projectPreviewTransformer = (
  project: ProjectPreview
): ProjectPreview => {
  return {
    ...project,
    createdAt: new Date(project.createdAt),
    updatedAt: new Date(project.updatedAt),
  };
};

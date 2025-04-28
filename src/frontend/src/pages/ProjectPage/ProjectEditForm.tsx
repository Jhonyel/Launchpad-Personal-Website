import { Project } from "shared";
import ProjectForm from "./ProjectForm";
import { useEditProject } from "../../hooks/projects.hooks";

export const ProjectEditForm = ({
  open,
  onHide,
  project,
}: {
  open: boolean;
  onHide: () => void;
  project: Project;
}) => {
  const { mutateAsync, isLoading } = useEditProject(project.id);

  const defaultValues = {
    title: project.title,
    description: project.description,
    githubUrl: project.githubUrl,
    skills: project.skills.map((skill) => {
      return { name: skill };
    }),
    images: [],
  };

  return (
    <ProjectForm
      defaultValues={defaultValues}
      mutateAsync={mutateAsync}
      isLoading={isLoading}
      onHide={onHide}
      open={open}
    />
  );
};

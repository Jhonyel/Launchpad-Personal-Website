import { useCreateProject } from "../../hooks/projects.hooks";
import ProjectForm from "./ProjectForm";

export const ProjectCreateForm = ({
  open,
  onHide,
}: {
  open: boolean;
  onHide: () => void;
}) => {
  const { mutateAsync, isLoading } = useCreateProject();

  const defaultValues = {
    title: "",
    description: "",
    githubUrl: "",
    skills: [],
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

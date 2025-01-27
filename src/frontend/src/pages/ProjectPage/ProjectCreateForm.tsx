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
    imageUrls: [],
    skills: [],
    githubUrl: "",
    images: [],
  };

  return (
    <ProjectForm
      open={open}
      onHide={onHide}
      mutateAsync={mutateAsync}
      defaultValues={defaultValues}
      isLoading={isLoading}
    />
  );
};

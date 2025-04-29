import { useCreateExperience } from "../../hooks/experiences.hooks";
import ExperienceForm from "./ExperienceForm";

export const ExperienceCreateForm = ({
  open,
  onHide,
}: {
  open: boolean;
  onHide: () => void;
}) => {
  const { mutateAsync, isLoading } = useCreateExperience();

  const defaultValues = {
    title: "",
    description: "",
    companyName: "",
    location: "",
    images: [],
  };

  return (
    <ExperienceForm
      defaultValues={defaultValues}
      mutateAsync={mutateAsync}
      isLoading={isLoading}
      onHide={onHide}
      open={open}
    />
  );
};

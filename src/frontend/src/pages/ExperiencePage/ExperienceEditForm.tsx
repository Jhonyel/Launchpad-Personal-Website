import { Experience } from "shared";
import { useEditExperience } from "../../hooks/experiences.hooks";
import ExperienceForm from "./ExperienceForm";

export const ExperienceEditForm = ({
  open,
  onHide,
  experience,
}: {
  open: boolean;
  onHide: () => void;
  experience: Experience;
}) => {
  const { mutateAsync, isLoading } = useEditExperience(experience.id);

  const defaultValues = {
    title: experience.title,
    description: experience.description,
    companyName: experience.companyName,
    location: experience.location,
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

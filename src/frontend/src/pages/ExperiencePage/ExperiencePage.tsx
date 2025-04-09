import ErrorPage from "../../components/ErrorPage";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useGetAllExperiences } from "../../hooks/experiences.hooks";
import ExperienceSection from "../../components/ExperienceSection";

function ExperiencesPage() {
  const {
    data: experiences,
    isLoading,
    isError,
    error,
  } = useGetAllExperiences();
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError || !experiences || error) {
    return <ErrorPage error={error!} />;
  }
  return (
    <>
      {experiences.map((experience) => (
        <ExperienceSection key={experience.id} experience={experience} />
      ))}
    </>
  );
}
export default ExperiencesPage;

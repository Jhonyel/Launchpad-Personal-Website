import ErrorPage from "../../components/ErrorPage";
import LoadingIndicator from "../../components/LoadingIndicator";
import ProjectCard from "../../components/ProjectCard";
import { useGetAllProjects } from "../../hooks/projects.hooks";

const Project = () => {
  const { data: projects, isLoading, isError, error } = useGetAllProjects();
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError || !projects || error) {
    return <ErrorPage error={error ?? undefined} />;
  }

  return (
    <>
      {projects.map((project) => (
        <ProjectCard project={project} />
      ))}
    </>
  );
};

export default Project;

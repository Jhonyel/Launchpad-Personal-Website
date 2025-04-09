import ErrorPage from "../../components/ErrorPage";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useGetAllProjects } from "../../hooks/projects.hooks";
import { Container } from "@mui/material";
import ProjectCard from "../../components/ProjectCard";

const ProjectsPage: React.FC = () => {
  const { data: projects, isLoading, isError, error } = useGetAllProjects();

  if (isError) {
    return <ErrorPage error={error} />;
  }
  if (isLoading || !projects) {
    return <LoadingIndicator />;
  }
  return (
    <Container>
      {projects.map((project) => {
        return <ProjectCard project={project} />;
      })}
    </Container>
  );
};

export default ProjectsPage;

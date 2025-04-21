import ErrorPage from "../../components/ErrorPage";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useGetAllProjects } from "../../hooks/projects.hooks";
import { Container } from "@mui/material";
import { useState } from "react";
import NERSuccessButton from "../../components/NERSuccessButton";
import ProjectForm from "./ProjectForm";
import ProjectCard from "../../components/ProjectCard";

const ProjectsPage: React.FC = () => {
  const { data: projects, isLoading, isError, error } = useGetAllProjects();
  const [createFormOpen, setCreateFormOpen] = useState(false);
  if (isError) {
    return <ErrorPage error={error} />;
  }
  if (isLoading || !projects) {
    return <LoadingIndicator />;
  }
  return (
    <Container>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      <NERSuccessButton onClick={() => setCreateFormOpen(true)}>
        Add Project
      </NERSuccessButton>
      <ProjectForm
        open={createFormOpen}
        onHide={() => setCreateFormOpen(false)}
      />
    </Container>
  );
};

export default ProjectsPage;

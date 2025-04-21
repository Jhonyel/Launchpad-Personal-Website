import ErrorPage from "../../components/ErrorPage";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useGetAllProjects } from "../../hooks/projects.hooks";
import { Container, Grid } from "@mui/material";
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
      <Grid container columnSpacing={20} mt={2} mb={2}>
        {projects.map((project) => {
          return (
            <Grid item xs={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          );
        })}
      </Grid>

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

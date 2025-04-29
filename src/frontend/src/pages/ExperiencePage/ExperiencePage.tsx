import { useState } from "react";
import ErrorPage from "../../components/ErrorPage";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useGetAllExperiences } from "../../hooks/experiences.hooks";
import { Container, Grid } from "@mui/material";
import ExperienceCard from "../../components/ExperienceCard";
import NERSuccessButton from "../../components/NERSuccessButton";
import { ExperienceCreateForm } from "./ExperienceCreateForm";

const ExperiencesPage: React.FC = () => {
  const {
    data: experiences,
    isLoading,
    isError,
    error,
  } = useGetAllExperiences();
  const [createFormOpen, setCreateFormOpen] = useState(false);

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (isLoading || !experiences) {
    return <LoadingIndicator />;
  }

  return (
    <Container>
      <Grid container columnSpacing={20} rowSpacing={2} mt={2} mb={2}>
        {experiences.map((experience) => {
          return (
            <Grid item xs={4} key={experience.id}>
              <ExperienceCard experience={experience} sx={{}} />
            </Grid>
          );
        })}
      </Grid>

      <NERSuccessButton onClick={() => setCreateFormOpen(true)}>
        Add Experience
      </NERSuccessButton>
      <ExperienceCreateForm
        open={createFormOpen}
        onHide={() => setCreateFormOpen(false)}
      />
    </Container>
  );
};
export default ExperiencesPage;

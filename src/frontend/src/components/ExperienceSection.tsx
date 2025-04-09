import { Grid, Typography } from "@mui/material";
import { Experience } from "shared";

interface ExperienceSectionProps {
  experience: Experience;
}
const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
  return (
    <Grid container>
      <Typography variant="h3">
        {experience.title} @ {experience.companyName}
      </Typography>
    </Grid>
  );
};

export default ExperienceSection;

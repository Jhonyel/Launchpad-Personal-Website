import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { CSSProperties, useState } from "react";
import { Experience } from "shared";
import { urls } from "../utils/urls";
import { ExperienceEditForm } from "../pages/ExperiencePage/ExperienceEditForm";

const ExperienceCard = ({
  experience,
  sx,
}: {
  experience: Experience;
  sx: CSSProperties;
}) => {
  const [showEditExperience, setShowEditExperience] = useState(false);
  return (
    <>
      <div onClick={() => setShowEditExperience(true)}>
        <Card
          sx={{
            ...sx,
            width: 350,
            height: 600,
            background: "#D1D4D6",
            position: "relative",
            ":hover": {
              cursor: "pointer",
              boxShadow: "0 0 20px #ef4343",
            },
          }}
        >
          <CardMedia
            sx={{
              height: 200,
              background: "#434343",
              borderColor: "#ef4343",
              borderStyle: "solid",
              borderWidth: 2,
            }}
          >
            <img
              src={urls.IMAGES(experience.imageUrls[0])}
              alt={experience.title}
              height={"100%"}
            />
          </CardMedia>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  color={"black"}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {experience.title}
                </Typography>
              </Grid>
            </Grid>

            <Typography variant="body1" color="black" flexGrow={1}>
              {experience.description}
            </Typography>
            <Typography variant="body1" color="black" flexGrow={1}>
              {experience.companyName}
            </Typography>
            <Typography variant="body1" color="black" flexGrow={1}>
              {experience.location}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <ExperienceEditForm
        open={showEditExperience}
        onHide={() => setShowEditExperience(false)}
        experience={experience}
      />
    </>
  );
};
export default ExperienceCard;

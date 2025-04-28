import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { CSSProperties, useState } from "react";
import { Project } from "shared";
import { urls } from "../utils/urls";
import { GitHub } from "@mui/icons-material";
import { ProjectEditForm } from "../pages/ProjectPage/ProjectEditForm";

const ProjectCard = ({
  project,
  sx,
}: {
  project: Project;
  sx: CSSProperties;
}) => {
  const [showEditProject, setShowEditProject] = useState(false);
  return (
    <>
      <div onClick={() => setShowEditProject(true)}>
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
              src={urls.IMAGES(project.imageUrls[0])}
              alt={project.title}
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
                  {project.title}
                </Typography>
              </Grid>
            </Grid>

            <Typography variant="body1" color="black" flexGrow={1}>
              {project.description}
            </Typography>
            <Grid container sx={{ position: "absolute", bottom: 0 }}>
              <Grid item xs={10}>
                {project.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    sx={{ margin: 1, color: "black", backround: "#B9BEC1" }}
                  />
                ))}
              </Grid>
              <Grid item xs={2} mt={"10px"}>
                <a
                  href={project.githubUrl}
                  style={{ color: "black" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHub />
                </a>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <ProjectEditForm
        open={showEditProject}
        onHide={() => setShowEditProject(false)}
        project={project}
      />
    </>
  );
};
export default ProjectCard;

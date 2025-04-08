import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { Project } from "shared";
import { urls } from "../utils/urls";

interface ProjectCardProps {
  project: Project;
}
const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, height: "80vh" }}>
      <CardActionArea sx={{ height: "100%" }}>
        <Box>
          <img src={urls.IMAGES(project.imageUrls[0])} />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {project.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;

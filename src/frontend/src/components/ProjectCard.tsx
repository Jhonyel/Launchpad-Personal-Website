import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Project } from "shared";
import { urls } from "../utils/urls";
import { ProjectEditForm } from "../pages/ProjectsPage/ProjectEditForm";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [showEditProject, setShowEditProject] = useState(false);

  return (
    <>
      <Card sx={{ maxWidth: 345, maxHeight: "80vh" }}>
        <CardActionArea sx={{ height: "100%" }}>
          {/* <CardMedia component="img" height="140" image="" alt="project image">
            <img src={urls.IMAGES(project.imageUrls[0])} />
          </CardMedia> */}
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
      <ProjectEditForm
        open={showEditProject}
        onHide={() => setShowEditProject(false)}
        project={project}
      />
    </>
  );
}

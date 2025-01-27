import { Role } from "shared";
import ProjectCard from "../ProjectPage/ProjectCard";

const Home = () => {
  return (
    <ProjectCard
      project={{
        id: "1234",
        title: "Project 1",
        description: "The worlds best project",
        url: "https://www.google.com",
        skills: ["Python", "React"],
        creator: {
          id: "",
          email: "",
          username: "",
          role: Role.ADMIN,
          imageUrl: "IMG_0261.jpg",
          title: "",
          bio: "",
          githubLink: "",
          linkedInLink: "",
        },
        imageUrls: ["IMG_0261.jpg"],
      }}
    />
  );
};

export default Home;

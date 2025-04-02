import { Role } from "shared";
import ProjectCard from "../ProjectPage/ProjectCard";
import { useGetAllProjects } from "../../hooks/projects.hooks";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorPage from "../../components/ErrorPage";

const Home = () => {
  const { data, isLoading, isError, error } = useGetAllProjects();
  if (isError) {
    console.error(error);
    return <ErrorPage error={error} />;
  }
  if (isLoading || !data) {
    return <LoadingIndicator />;
  }
  return <ProjectCard project={data[0]} />;
};

export default Home;

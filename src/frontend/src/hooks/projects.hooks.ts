import { useMutation, useQuery, useQueryClient } from "react-query";
import { createProject, getProjects } from "../apis/projects.api";
import { Project } from "shared";
import { ProjectFormInput } from "../pages/ProjectPage/ProjectForm";

export const useGetAllProjects = () => {
  return useQuery<Project[], Error>(["projects"], async () => {
    return await getProjects();
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<Project, Error, ProjectFormInput>(
    [],
    async (projectData: ProjectFormInput) => {
      return await createProject(projectData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );
};

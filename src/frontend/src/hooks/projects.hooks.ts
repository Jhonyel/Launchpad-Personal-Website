import { useMutation, useQuery, useQueryClient } from "react-query";
import { createProject, editProject, getProjects } from "../apis/projects.api";
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

export const useEditProject = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Project, Error, ProjectFormInput>(
    [],
    async (projectData: ProjectFormInput) => {
      return await editProject({ ...projectData, id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );
};

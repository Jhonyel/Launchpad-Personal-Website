import { useMutation, useQuery, useQueryClient } from "react-query";
import { createProject, getProjects } from "../apis/projects.api";
import { Project } from "shared";
import { ProjectFormInput } from "../pages/ProjectPage/ProjectForm";

export function useGetAllProjects() {
  return useQuery<Project[], Error>(["projects"], async () => {
    const { data } = await getProjects();
    return data;
  });
}

export function useCreateProject() {
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
}

export const useEditProject = (id: string) => {};

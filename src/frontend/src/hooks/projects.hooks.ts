import { useQuery } from "react-query";
import { getProjects } from "../apis/projects.api";
import { Project } from "shared";

export const useGetAllProjects = () => {
  return useQuery<Project[], Error>([], async () => {
    return await getProjects();
  });
};

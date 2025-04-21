import { Project } from "shared";
import axios from "../utils/axios";
import { urls } from "../utils/urls";
import { ProjectFormInput } from "../pages/ProjectPage/ProjectForm";

export const getProjects = async () => {
  const response = await axios.get<Project[]>(urls.PROJECTS);

  return response.data;
};

export const createProject = async (projectData: ProjectFormInput) => {
  const response = await axios.post<Project>(urls.CREATE_PROJECT, projectData);

  return response.data;
};

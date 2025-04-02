import { Project } from "shared";
import axios from "../utils/axios";
import { urls } from "../utils/urls";

export const getProjects = async () => {
  const response = await axios.get<Project[]>(urls.PROJECTS);

  return response.data;
};

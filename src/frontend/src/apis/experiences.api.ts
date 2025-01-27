import axios from "../utils/axios";
import { urls } from "../utils/urls";

export function getExperiences() {
  return axios.get(urls.EXPERIENCES);
}

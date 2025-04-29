import { Experience } from "shared";
import axios from "../utils/axios";
import { urls } from "../utils/urls";
import { ExperienceFormInput } from "../pages/ExperiencePage/ExperienceForm";

export const getExperiences = async () => {
  const response = await axios.get<Experience[]>(urls.EXPERIENCES);

  return response.data;
};

export const createExperience = async (experienceData: ExperienceFormInput) => {
  const formData = new FormData();
  formData.append("description", experienceData.description);
  formData.append("title", experienceData.title);
  formData.append("location", experienceData.location);
  experienceData.images.forEach((image) =>
    formData.append("images", image.file)
  );
  formData.append("companyName", experienceData.companyName);

  const respone = await axios.post<Experience>(
    urls.CREATE_EXPERIENCE,
    formData
  );

  return respone.data;
};

interface ExperienceEditInput extends ExperienceFormInput {
  id: string;
}

export const editExperience = async (experienceData: ExperienceEditInput) => {
  const formData = new FormData();
  formData.append("description", experienceData.description);
  formData.append("title", experienceData.title);
  formData.append("location", experienceData.location);
  experienceData.images.forEach((image) =>
    formData.append("images", image.file)
  );
  formData.append("companyName", experienceData.companyName);

  const respone = await axios.post<Experience>(
    urls.EDIT_EXPERIENCE(experienceData.id),
    formData
  );

  return respone.data;
};

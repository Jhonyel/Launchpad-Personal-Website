import { useMutation, useQuery, useQueryClient } from "react-query";
import { Experience } from "shared";
import {
  createExperience,
  editExperience,
  getExperiences,
} from "../apis/experiences.api";
import { ExperienceFormInput } from "../pages/ExperiencePage/ExperienceForm";

export function useGetAllExperiences() {
  return useQuery<Experience[], Error>(["experiences"], async () => {
    return await getExperiences();
  });
}

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation<Experience, Error, ExperienceFormInput>(
    [],
    async (experienceData: ExperienceFormInput) => {
      return await createExperience(experienceData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["experiences"]);
      },
    }
  );
};

export const useEditExperience = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Experience, Error, ExperienceFormInput>(
    [],
    async (experienceData: ExperienceFormInput) => {
      return await editExperience({ ...experienceData, id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["experiences"]);
      },
    }
  );
};

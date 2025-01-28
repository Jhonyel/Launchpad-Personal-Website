import { useQuery } from "react-query";
import { Experience } from "shared";
import { getExperiences } from "../apis/experiences.api";

export function useGetAllExperiences() {
  return useQuery<Experience[], Error>([], async () => {
    const { data } = await getExperiences();
    return data;
  });
}

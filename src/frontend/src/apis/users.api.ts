import { User } from "shared";
import axios from "../utils/axios";
import { urls } from "../utils/urls";
import { userTransformer } from "../transformers/user.transformer";

export const getAllUsers = async () => {
  const response = await axios.get<User[]>(urls.USERS, {
    transformResponse: (data) => JSON.parse(data).map(userTransformer),
  });

  return response;
};

export const logUserIn = (userId: string) => {
  return axios.post<User>(
    urls.LOGIN,
    { userId },
    {
      transformResponse: (data) => userTransformer(JSON.parse(data)),
    }
  );
};

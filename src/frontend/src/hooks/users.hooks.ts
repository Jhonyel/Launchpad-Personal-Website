import { useMutation, useQuery } from "react-query";
import { User } from "shared";
import { getAllUsers, logUserIn } from "../apis/users.api";
import { useContext } from "react";
import { UserContext } from "../app/AppContextUser";

export const useGetAllUsers = () => {
  return useQuery<User[], Error>("users", async () => {
    const { data } = await getAllUsers();
    return data;
  });
};

export const useLogUserIn = () => {
  return useMutation<User, Error, string>(
    ["users", "login"],
    async (userId: string) => {
      const { data } = await logUserIn(userId);
      return data;
    }
  );
};

export const useCurrentUser = (): User => {
  const user = useContext(UserContext);
  if (!user) throw Error("useCurrentUser must be used inside of context.");
  return user;
};

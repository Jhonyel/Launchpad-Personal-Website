/*
 * This file is part of NER's FinishLine and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { useState, useContext } from "react";
import { AuthContext } from "../app/AppContextAuth";
import { useLogUserIn } from "./users.hooks";
import { Auth } from "../utils/auth";
import { User } from "shared";

// Provider hook that creates auth object and handles state
export const useProvideAuth = () => {
  const { isLoading, mutateAsync } = useLogUserIn();

  const [user, setUser] = useState<User | undefined>(undefined);

  const signIn = async (userId: string) => {
    const user = await mutateAsync(userId);
    setUser(user);
    localStorage.setItem("devUserId", userId.toString());
    return user;
  };

  const signout = () => {
    localStorage.setItem("devUserId", "");
    setUser(undefined);
  };

  return {
    user,
    signIn,
    signout,
    isLoading,
  } as Auth;
};

// Hook for child components to get the auth object
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw Error("Auth must be used inside of context.");
  return context;
};

import { createContext } from "react";
import { User } from "shared";
import { useAuth } from "../hooks/auth.hooks";
import LoadingIndicator from "../components/LoadingIndicator";
import { PropsWithChildren } from "react";

export const UserContext = createContext<User | undefined>(undefined);

const AppContextUser = ({children}: PropsWithChildren) => {
  const auth = useAuth();

  if (!auth.user) return <LoadingIndicator />;

  return <UserContext.Provider value={auth.user}>{children}</UserContext.Provider>;
};

export default AppContextUser;
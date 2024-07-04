import { createContext } from "react";
import { useProvideAuth } from "../hooks/auth.hooks";
import { Auth } from "../utils/auth";
import { PropsWithChildren } from "react";

export const AuthContext = createContext<Auth | undefined>(undefined);

const AppContextAuth = ({children}: PropsWithChildren) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AppContextAuth;

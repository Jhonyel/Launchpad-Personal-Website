/*
 * This file is part of NER's FinishLine and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hooks";
import { routes } from "../../utils/routes";
import LoadingIndicator from "../../components/LoadingIndicator";
import LoginForm from "./LoginForm";
import { useQuery } from "../../hooks/utils.hooks";

/**
 * Page for unauthenticated users to do login.
 */
const Login = () => {
  const [userId, setUserId] = useState("");
  const history = useHistory();
  const query = useQuery();
  const auth = useAuth();

  if (auth.isLoading) return <LoadingIndicator />;

  /**
   * Produce the path of the page redirected from the login page.
   * @param queryArgs the query args sent from the login page, containing page, value1, value2, ..., and other args
   * @returns the path, with args, redirected to
   */
  const redirectQueryArgsToPath = (queryArgs: URLSearchParams): string => {
    const pageName: string = queryArgs.get("page")!;
    queryArgs.delete("page");

    const intermediatePathValues: string[] = [];
    for (let valueIdx = 1; queryArgs.has(`value${valueIdx}`); valueIdx++) {
      // collect all the &valueX=... args, in order, from login query args
      intermediatePathValues.push(`/${queryArgs.get(`value${valueIdx}`)!}`);
      queryArgs.delete(`value${valueIdx}`);
    }

    const pathString: string = `/${pageName}${intermediatePathValues.join("")}`;
    return `${pathString}?${queryArgs.toString()}`;
  };

  const redirectAfterLogin = () => {
    if (!query.has("page")) {
      history.push(routes.HOME);
    } else {
      history.push(redirectQueryArgsToPath(query));
    }
  };

  const onLoginFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await auth.signIn(userId);

    redirectAfterLogin();
  };

  return <LoginForm setUser={setUserId} formSubmit={onLoginFormSubmit} />;
};

export default Login;


import { Switch, Route, Redirect, useHistory, RouteComponentProps } from 'react-router-dom';
import { useAuth } from '../hooks/auth.hooks';
import AppAuthenticated from './AppAuthenticated.tsx';
import LoadingIndicator from '../components/LoadingIndicator';
import { routes } from '../utils/routes';
import Login from '../pages/LoginPage/Login.tsx';

const AppPublic: React.FC = () => {
  const auth = useAuth();
  const history = useHistory();
  const userId = localStorage.getItem('userId');

  const render: ((props: RouteComponentProps) => React.ReactNode) | undefined = (e) => {
    // if logged in, go to authenticated app
    if (auth.user) {
      return <AppAuthenticated  />;
    }

    // if we're on development and the userId is stored in localStorage,
    // then dev login right away (no login page redirect needed!)
    if (userId) {
      auth.signIn(userId);
      return <LoadingIndicator />;
    }

    // otherwise, the user needs to login manually
    // prepare query args to store path after login
    const redirectPathParts: string[] = history.location.pathname.split('/').slice(1);

    // if the path ended in an trailing '/' we don't want to clutter the query args with empty param
    if (redirectPathParts[redirectPathParts.length - 1] === '') redirectPathParts.pop();

    const redirectPathQueryArgs: string =
      redirectPathParts.length === 0
        ? ''
        : redirectPathParts
            .slice(1) // "valueX=" starts from second part of the path
            .reduce(
              (prevArgs: string, pathPart: string, idx: number): string => `${prevArgs}&value${idx + 1}=${pathPart}`,
              `?page=${redirectPathParts[0]}`
            );

    const redirectQueryArgs =
      redirectPathQueryArgs + (history.location.search.length > 0 ? `&${history.location.search.slice(1)}` : '');

    return (
      <Redirect
        to={{
          pathname: routes.LOGIN,
          search: redirectQueryArgs,
          state: { from: e.location }
        }}
      />
    );
  };

  return (
    <Switch>
      <Route path={routes.LOGIN}>
        <Login />
      </Route>
      <Route path="*" render={render} />
    </Switch>
  );
};

export default AppPublic;

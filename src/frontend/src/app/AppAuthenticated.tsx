/*
 * This file is part of NER's FinishLine and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { Route, Switch } from "react-router-dom";
import { routes } from "../utils/routes";
import AppContextUser from "./AppContextUser";
import { Box, Container } from "@mui/material";
import { PageNotFound } from "../components/PageNotFound";
import Home from "../pages/HomePage/Home";
import TopNavBar from "../components/TopNavBar";
import Footer from "../components/Footer";

const AppAuthenticated = () => {
  return (
    <AppContextUser>
      <Box>
        <TopNavBar />
        <Container maxWidth={false}>
          <Switch>
            <Route path={routes.HOME} component={Home} />
            <Route path="*" component={PageNotFound} />
          </Switch>
          <Footer />
        </Container>
      </Box>
    </AppContextUser>
  );
};

export default AppAuthenticated;

import { BrowserRouter } from "react-router-dom";
import AppContextAuth from "./AppContextAuth";
import AppContextQuery from "./AppContextQuery";
import AppPublic from "./AppPublic";
import theme from "../utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const App = () => {
  return (
    <AppContextQuery>
      <AppContextAuth>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <AppPublic />
          </BrowserRouter>
        </ThemeProvider>
      </AppContextAuth>
    </AppContextQuery>
  );
};

export default App;

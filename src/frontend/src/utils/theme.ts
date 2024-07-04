import { createTheme } from "@mui/material/styles";
import Oswald from "../fonts/Oswald-Regular.ttf";
import Lato from "../fonts/Lato-Regular.ttf";

const theme = createTheme({
  typography: {
    fontFamily: "Oswald",
    h1: {
      color: "#ef4343",
    },
    body1: {
      fontFamily: "lato",
      color: "white",
    },
  },
  palette: {
    mode: "dark",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: [
          {
            "@font-face": {
              fontFamily: "Oswald",
              src: `url(${Oswald}) format("truetype")`,
            },
          },
          {
            "@font-face": {
              fontFamily: "Lato",
              src: `url(${Lato}) format("truetype")`,
            },
          },
        ],
      },
    },
  },
});

export default theme;

import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fa9e2f",
      main: "#FE9920",
      dark: "#f78b0a",
      contrastText: "#fff",
    },
    secondary: {
      light: "#5ed19d",
      main: "#59c292",
      dark: "#53bd8d",
      contrastText: "#fff",
    },
    error: {
      light: "#EF6C79",
      main: "#EC5766",
      dark: "#EB4758",
    },
  },
});

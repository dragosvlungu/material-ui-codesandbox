import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { red, amber } from "@material-ui/core/colors";

import App from "./Components/App";

console.log(red);

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: {
      main: amber.A400,
      light: amber[200],
      dark: amber[700]
    },
    type: "dark"
  }
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  rootElement
);

import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { brown, blueGrey } from "@material-ui/core/colors";

import App from "./Components/App";

const theme = createMuiTheme({
  palette: {
    primary: brown,
    secondary: {
      main: blueGrey.A400,
      light: blueGrey[200],
      dark: blueGrey[700]
    },
    type: "dark"
  },
  spacing: {
    unit: 10
  }
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  rootElement
);

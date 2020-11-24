import {
  createMuiTheme,
  CssBaseline as MuiCssBaseline,
  ThemeProvider,
  withStyles,
} from "@material-ui/core";
import "fontsource-roboto";
import React from "react";
import { palette } from "../../media/tmdb/attribution";

export const theme = createMuiTheme({
  typography: {
    fontWeightRegular: "bold",
  },

  palette: {
    type: "dark",
    primary: {
      main: palette.secondary,
      dark: palette.primary,
    },
    secondary: {
      main: palette.tertiary,
    },
    background: {
      paper: "#202020",
      default: "#101010",
    },
  },
  overrides: {},
});

const CssBaseline = withStyles((theme) => ({
  "@global": {
    html: {
      touchAction: "manipulation", //prevent double-tap zoom
      scrollbarColor: `${theme.palette.grey[800]} ${theme.palette.background.default}`,
    },
    "*::-webkit-scrollbar": {
      // width: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
    },
    "*::-webkit-scrollbar-track": {
      borderRadius: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
    },
    "*::-webkit-scrollbar-thumb": {
      borderRadius: theme.spacing(2),
      backgroundColor: theme.palette.grey[800], //theme.palette.background.paper,
      "&:hover": {
        backgroundColor: theme.palette.grey[900],
      },
    },
    "::-webkit-scrollbar-corner": {
      background: theme.palette.background.default,
    },
  },
}))(MuiCssBaseline);

export default ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

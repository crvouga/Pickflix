import {
  AppBar,
  Fade,
  IconButton,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { MovieDetails } from "../../tmdb/types";

interface Props {
  details: MovieDetails;
}

export default ({ details }: Props) => {
  const trigger = useScrollTrigger();
  return (
    <Fade in={trigger}>
      <AppBar color="default">
        <Toolbar>
          <IconButton edge="start">
            <ArrowBackIcon />
          </IconButton>
          <Typography align="center" style={{ fontWeight: "bold", flex: 1 }}>
            {details.title}
          </Typography>
          <IconButton edge="end">{/* <ArrowBackIcon /> */}</IconButton>
        </Toolbar>
      </AppBar>
    </Fade>
  );
};
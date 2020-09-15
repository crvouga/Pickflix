import {
  Box,
  Chip,
  makeStyles,
  Avatar,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import makeTMDbImageURL from "../tmdb/makeTMDbImageURL";
import typeToIcon from "./typeToIcon";

const useStyles = makeStyles((theme) => ({
  borderRadius: {
    borderRadius: theme.spacing(8),
  },
  active: {
    color: "#000",
    backgroundColor: "#fff",
  },
  inactive: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    height: "50px",
    boxSizing: "content-box",
    display: "flex",
    flexDirection: "row",
    fontSize: "1.5em",
    fontWeight: "bold",
    border: "solid grey 0.5px",
  },
  avatar: {
    boxSizing: "content-box",
    width: "50px",
    height: "50px",
  },
  backgroundColorWhite: {
    backgroundColor: "white",
  },
  label: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    minWidth: "3em",

    fontWeight: "bold",
  },
  hidden: {
    display: "hidden",
  },
}));
export default ({ tag, variant, active, onClick, ...restOfProps }) => {
  const classes = useStyles();
  const tagURL = makeTMDbImageURL(5, tag);
  const tagIcon = typeToIcon(tag.type);
  return (
    <ButtonBase className={classes.borderRadius} onClick={onClick}>
      <div
        className={clsx(classes.root, classes.borderRadius, {
          [classes.active]: active,
          [classes.inactive]: !active,
        })}
      >
        {tagURL && (
          <Avatar
            className={clsx(classes.avatar, {
              [classes.backgroundColorWhite]: tag.type === "company" || active,
            })}
            src={tagURL}
          ></Avatar>
        )}
        <div className={classes.label}>
          <Typography component="div" color="inherit" className={classes.name}>
            {tag.name}
          </Typography>
        </div>
      </div>
    </ButtonBase>
    // <Chip
    //   clickable
    //   avatar={(tagIcon || tagURL) && <Avatar src={tagURL}>{tagIcon}</Avatar>}
    //   classes={classes}
    //   variant={variant}
    //   label={tag.name}
    //   {...restOfProps}
    // />
  );
};
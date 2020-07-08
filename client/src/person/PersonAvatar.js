import { Avatar, makeStyles } from "@material-ui/core";
import React from "react";
import useMakeImageUrl from "../tmdb/useMakeImageUrl";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "100%",
    height: "100%",
  },
  svg: {
    width: "100%",
    display: "block",
    visibility: "hidden",
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  root: {
    position: "relative",
    width: "100%",
    height: "auto",
  },
}));

export default ({ person }) => {
  const { profilePath } = person;
  const classes = useStyles();
  const makeImageUrl = useMakeImageUrl();
  const profileURL = makeImageUrl(2, { profilePath });
  const history = useHistory();
  const handleClick = () => {
    history.push(`/person/${person.id}`);
  };
  return (
    <div className={classes.root} onClick={handleClick}>
      <svg className={classes.svg} viewBox="0 0 1 1" />
      <div className={classes.content}>
        <Avatar className={classes.avatar} src={profileURL} />
      </div>
    </div>
  );
};

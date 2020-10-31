import { Avatar, IconButton, makeStyles, Typography } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import moment from "moment";
import numeral from "numeral";
import React from "react";
import ReadMore from "../common/components/ReadMore";

import { YoutubeComment } from "./query/types";
import { youtubeCommentTextToMarkdown } from "./query";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    maxWidth: "100%",
  },
  body: {
    display: "flex",
    flexDirection: "column",
  },
  avatarContainer: {
    paddingRight: theme.spacing(1),
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    color: theme.palette.text.secondary,
  },
  iconButton: {
    marginLeft: -theme.spacing(1),
  },
  icon: {
    width: "0.7em",
    height: "0.7em",
  },
  likeCount: {
    marginTop: "0.75em",
    marginLeft: "-0.5em",
  },
  subtitle1: {
    wordBreak: "break-word",
  },
}));

interface Props {
  comment: YoutubeComment;
}

export default ({ comment }: Props) => {
  const { snippet } = comment;
  const {
    authorDisplayName,
    authorProfileImageUrl,
    textDisplay,
    likeCount,
    publishedAt,
  } = snippet;

  const classes = useStyles();

  const formattedLikes = numeral(likeCount).format("0.0a").replace(".0", "");
  const formattedPublishedAt = moment(publishedAt, "YYYYMMDD")
    .fromNow()
    .replace("a ", "1 ");

  const subtitle1 = `${authorDisplayName} • ${formattedPublishedAt}`;

  const handleAvatarClick = () => {};

  const textDisplayMarkdown = youtubeCommentTextToMarkdown(textDisplay);

  return (
    <div className={classes.root}>
      <div className={classes.avatarContainer}>
        <Avatar src={authorProfileImageUrl} onClick={handleAvatarClick} />
      </div>
      <div className={classes.body}>
        <Typography variant="subtitle2" color="textSecondary">
          {subtitle1}
        </Typography>
        <Typography variant="body1">{textDisplayMarkdown}</Typography>

        <div className={classes.actions}>
          {likeCount > 0 && (
            <React.Fragment>
              <IconButton className={classes.iconButton} color="inherit">
                <ThumbUpIcon className={classes.icon} />
              </IconButton>
              <Typography
                variant="subtitle2"
                className={classes.likeCount}
                color="inherit"
              >
                {formattedLikes}
              </Typography>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

import { makeStyles, Typography, TypographyProps } from "@material-ui/core";
import React from "react";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles((theme) => ({
  markdown: {
    marginBottom: "-1em",
    userSelect: "text",
    fontSize: "inherit",
    font: "inherit",
    wordBreak: "break-word",
    maxWidth: "100%",
    marginTop: -theme.spacing(1.5),
    "& a": {
      color: theme.palette.info.main,
      textDecoration: "none",
      wordBreak: "break-all",
    },
  },
}));

interface Props extends TypographyProps<"div"> {
  source?: string;
}

export default ({ source, children, ...props }: Props) => {
  const classes = useStyles();
  return (
    <Typography
      component="div"
      color="textSecondary"
      variant="body2"
      {...props}
    >
      <ReactMarkdown
        // extremely nested <blockquote>...</blockquote> was rendering in youtube comments making it too wide
        disallowedTypes={["blockquote"]}
        className={classes.markdown}
        source={source}
      >
        {children}
      </ReactMarkdown>
    </Typography>
  );
};

import { Box, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import numeral from "numeral";
import React from "react";
import { pluralize } from "../utils";
import { ReviewStatistics } from "./query";

export default ({ statistics }: { statistics: ReviewStatistics }) => {
  return (
    <Box
      marginX={2}
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        color={
          statistics.ratingCount === 0 ? "action.disabled" : "text.primary"
        }
      >
        <Typography variant="h2" color="inherit">
          {numeral(statistics.ratingAverage).format("0.0[0]")}
        </Typography>
      </Box>
      <Rating size="small" max={5} value={statistics.ratingAverage} readOnly />
      <Typography variant="subtitle1" color="textSecondary">
        {pluralize(statistics.ratingCount, "review")}
      </Typography>
    </Box>
  );
};

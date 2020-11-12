import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import ErrorBox from "../../common/components/ErrorBox";
import LoadingBox from "../../common/components/LoadingBox";
import { getTmdbMovieReviews, queryKeys } from "../../tmdb/query";
import TmdbReviewCard from "./TmdbReviewCard";
import { MediaId } from "../../tmdb/types";

export default ({ mediaId }: { mediaId: MediaId }) => {
  const query = useQuery(queryKeys.movieReviews({ mediaId }), () =>
    getTmdbMovieReviews({ mediaId })
  );

  if (query.error) {
    return <ErrorBox />;
  }

  if (!query.data) {
    return <LoadingBox p={6} />;
  }

  const reviews = query.data;

  return (
    <React.Fragment>
      {reviews.results.map((review) => (
        <Box key={review.id} paddingX={2} paddingY={1}>
          <TmdbReviewCard review={review} />
        </Box>
      ))}
    </React.Fragment>
  );
};

import { Box, Grow, Typography } from "@material-ui/core";
import React from "react";
import MoviePoster from "../movie/components/Poster";
import PersonAvatar from "../person/PersonAvatar";

export default ({ results, onChose }) => {
  const handleChose = (result) => () => onChose(result);

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      {results.map((result) => (
        <Box key={result.id} onClick={handleChose(result)} width="33.33%">
          <Grow in>
            {result.mediaType === "movie" ? (
              <MoviePoster movie={result} />
            ) : result.mediaType === "person" ? (
              <Box marginBottom="auto" p={1}>
                <PersonAvatar person={result} marginBottom={1} />
                <Typography>{result.name}</Typography>
              </Box>
            ) : (
              <div />
            )}
          </Grow>
        </Box>
      ))}
    </Box>
  );
};
import { Box, CircularProgress, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import { useDebounce } from "use-debounce/lib";
import useBoolean from "../../../common/hooks/useBoolean";
import { useQueryMovieSearch } from "../../../media/tmdb/query";
import { MediaId, TmdbMediaType } from "../../../media/tmdb/types";
import { MovieCardHeaderContainer } from "../../../movie/components/MovieCardHeader";
import MovieListItem from "../../../movie/components/MovieListItem";
import useReviewForm from "./useReviewForm";

const MediaSearch = React.forwardRef(
  (
    {
      onSelected,
      onFocus,
      onBlur,
    }: {
      onSelected: (mediaId: MediaId) => void;
      onFocus?: () => void;
      onBlur?: () => void;
    },
    inputRef
  ) => {
    const [text, setText] = useState("");
    const [debouncedText] = useDebounce(text, 200);

    const query = useQueryMovieSearch({
      text: debouncedText,
    });

    const options = [...(query.data?.results || [])];

    return (
      <Autocomplete
        onInputChange={(e, newText) => {
          setText(newText);
        }}
        onChange={(e, option) => {
          if (option) {
            const mediaId: MediaId = {
              tmdbMediaId: Number(option.id),
              tmdbMediaType: TmdbMediaType.movie,
            };
            onSelected(mediaId);
          }
        }}
        getOptionLabel={(option) => option.title}
        renderOption={(option) => <MovieListItem disabled movie={option} />}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            autoFocus
            inputRef={inputRef}
            variant="outlined"
            label="Choose Movie"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {query.isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }
);

export default () => {
  const reviewForm = useReviewForm();
  const mediaId = reviewForm.review.mediaId;

  const isFocused = useBoolean(false);

  const handleClick = () => {
    isFocused.setTrue();
  };

  const handleSelect = (mediaId: MediaId) => {
    reviewForm.setReview({
      ...reviewForm.review,
      mediaId: mediaId,
    });
  };

  if (!mediaId) {
    return (
      <Box p={2}>
        <MediaSearch onBlur={isFocused.setFalse} onSelected={handleSelect} />
      </Box>
    );
  }

  return (
    <MovieCardHeaderContainer
      mediaId={mediaId}
      // action={
      //   <IconButton onClick={handleClick}>
      //     <SearchIcon />
      //   </IconButton>
      // }
    />
  );
};

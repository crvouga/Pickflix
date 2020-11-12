import { QueryKey, useQueryCache } from "react-query";
import {
  deleteReviewVote,
  GetReviewsData,
  postReviewVote,
  ReviewAggergation,
  ReviewVoteValue,
} from "./query";
import useSnackbar from "../snackbar/useSnackbar";

const updateReviewVoteValue = (
  nextVoteValue: ReviewVoteValue | null,
  review: ReviewAggergation
) => {
  const previousVoteValue = review.reviewVoteValue;
  const updated: ReviewAggergation = {
    ...review,
    reviewVoteValue: nextVoteValue,
  };

  if (previousVoteValue === null && nextVoteValue !== null) {
    updated.reviewVoteCount += 1;
  }

  if (previousVoteValue !== null && nextVoteValue === null) {
    updated.reviewVoteCount -= 1;
  }

  if (
    previousVoteValue !== ReviewVoteValue.UP &&
    nextVoteValue === ReviewVoteValue.UP
  ) {
    updated.reviewUpVoteCount += 1;
  }

  if (
    previousVoteValue === ReviewVoteValue.UP &&
    nextVoteValue !== ReviewVoteValue.UP
  ) {
    updated.reviewUpVoteCount -= 1;
  }

  return updated;
};

const optimisticUpdate = (
  reviewId: string,
  nextVoteValue: ReviewVoteValue | null,
  previous: ReviewAggergation[]
) => {
  if (!previous) {
    return previous;
  }
  const index = previous.findIndex((_) => _.review.id === reviewId);

  if (index === -1) {
    return previous;
  }

  return [
    ...previous.slice(0, index),
    updateReviewVoteValue(nextVoteValue, previous[index]),
    ...previous.slice(index + 1),
  ];
};

export default (queryKey: QueryKey) => {
  const snackbar = useSnackbar();
  const queryCache = useQueryCache();

  const previous = queryCache.getQueryData<GetReviewsData>(queryKey);

  const toggleVoteValue = async (
    review: ReviewAggergation,
    voteValue: ReviewVoteValue
  ) => {
    if (previous) {
      queryCache.setQueryData(
        queryKey,
        optimisticUpdate(
          review.review.id,
          review.reviewVoteValue === voteValue ? null : voteValue,
          previous
        )
      );
    }

    try {
      if (review.reviewVoteValue === voteValue) {
        await deleteReviewVote({ reviewId: review.review.id });
        snackbar.display({ message: "Removed vote" });
      } else {
        await postReviewVote({
          reviewId: review.review.id,
          voteValue: voteValue,
        });
        snackbar.display({
          message:
            voteValue === ReviewVoteValue.UP
              ? "Up voted review"
              : "Down voted review",
        });
      }
    } catch (error) {
      queryCache.setQueryData(queryKey, previous);
    } finally {
      queryCache.invalidateQueries(queryKey);
    }
  };

  const voteUp = async (review: ReviewAggergation) => {
    toggleVoteValue(review, ReviewVoteValue.UP);
  };

  const voteDown = async (review: ReviewAggergation) => {
    toggleVoteValue(review, ReviewVoteValue.DOWN);
  };

  return {
    voteUp,
    voteDown,
  };
};

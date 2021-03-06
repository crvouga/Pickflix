import { Grid, GridProps } from "@material-ui/core";
import React from "react";
import NothingHere from "../../common/components/NothingHere";
import { InfiniteScrollBottom } from "../../common/infinite-scroll";
import { useListener } from "../../common/utility";
import WithAuthentication from "../../user/auth/WithAuthentication";
import { eventEmitterDeleteReview } from "../form/delete-review/delete-review-form";
import { eventEmitterReviewForm } from "../form/edit-create-review/review-form";
import { GetReviewsParams, useQueryReviews } from "../query";
import {
  ReviewCardCallToAction,
  ReviewCardCallToActionProps,
} from "./call-to-action/ReviewCardCallToAction";
import { ReviewCardProps } from "./ReviewCard";
import ReviewCardContainer from "./ReviewCardContainer";
import ReviewCardSkeleton from "./ReviewCardSkeleton";

const DEFAULT_REVIEW_CARD_PROPS: Partial<ReviewCardProps> = {
  showMedia: true,
};

const DEFAULT_ITEM_PROPS: GridProps = {
  xs: 12,
  sm: 6,
  md: 4,
};

export const ReviewCardGridSkeleton = ({
  ItemProps = DEFAULT_ITEM_PROPS,
  ReviewCardProps = DEFAULT_REVIEW_CARD_PROPS,
  count,
}: {
  ReviewCardProps?: Partial<ReviewCardProps>;
  ItemProps?: GridProps;
  count: number;
}) => {
  return (
    <Grid container spacing={1}>
      {[...Array(count)].map((_, index) => (
        <Grid key={index} item {...ItemProps}>
          <ReviewCardSkeleton {...ReviewCardProps} />
        </Grid>
      ))}
    </Grid>
  );
};

type ReviewCardGridContainerProps = {
  ItemProps?: GridProps;
  limit?: number;
  renderOverLimit?: () => React.ReactNode;
  ReviewCardProps?: Partial<ReviewCardProps>;
  ReviewCardCallToActionProps?: ReviewCardCallToActionProps;
  count?: number;
  GetReviewParams: GetReviewsParams;
};

export const ReviewCardGridContainer = ({
  GetReviewParams,
  count,
  ItemProps = DEFAULT_ITEM_PROPS,
  limit,
  renderOverLimit,
  ReviewCardProps = DEFAULT_REVIEW_CARD_PROPS,
  ReviewCardCallToActionProps,
}: ReviewCardGridContainerProps) => {
  const query = useQueryReviews(GetReviewParams);

  useListener(eventEmitterReviewForm, "submitSuccess", () => {
    query.refetch();
  });
  useListener(eventEmitterDeleteReview, "submitSuccess", () => {
    query.refetch();
  });

  if (query.error) {
    return null;
  }

  if (query.data === undefined) {
    return (
      <ReviewCardGridSkeleton
        {...ReviewCardProps}
        ItemProps={ItemProps}
        count={count || 0}
      />
    );
  }

  const reviews = query.data.flatMap((page) => page.results);

  if (reviews.length === 0) {
    return (
      <WithAuthentication
        renderAuthenticated={(currentUser) =>
          GetReviewParams.userId &&
          GetReviewParams.userId !== currentUser.user.id ? (
            <NothingHere />
          ) : (
            <ReviewCardCallToAction {...ReviewCardCallToActionProps} />
          )
        }
        renderDefault={() => <NothingHere />}
      />
    );
  }

  if (limit) {
    const sliced = reviews.slice(0, limit);
    return (
      <React.Fragment>
        <Grid container spacing={1}>
          {sliced.map((review) => (
            <Grid key={review.review.id} item {...ItemProps}>
              <ReviewCardContainer
                ReviewCardProps={{ ...ReviewCardProps, review }}
              />
            </Grid>
          ))}
        </Grid>
        {renderOverLimit && reviews.length > limit && renderOverLimit()}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {reviews.map((review) => (
          <Grid key={review.review.id} item {...ItemProps}>
            <ReviewCardContainer
              ReviewCardProps={{ ...ReviewCardProps, review }}
            />
          </Grid>
        ))}
      </Grid>

      <InfiniteScrollBottom {...query} />
    </React.Fragment>
  );
};

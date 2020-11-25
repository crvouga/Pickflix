import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardHeaderProps,
  IconButton,
  IconButtonProps,
  Typography,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Rating } from "@material-ui/lab";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import useBoolean from "../../common/hooks/useBoolean";
import MovieAvatar from "../../movie/components/MovieAvatar";
import AvatarUser from "../../user/components/AvatarUser";
import { pluralize } from "../../common/utility";
import { ReviewAggergation } from "../query/types";
import ReviewCardActions from "./ReviewCardActions";
import ReviewCardOptionsModal from "./ReviewCardOptionsModal";
import { makeUserPageRoute } from "../../user/UserPage";

const MoreButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props}>
      <MoreHorizIcon />
    </IconButton>
  );
};

export const CardHeaderAuthor = ({
  review,
  CardHeaderProps,
}: {
  review: ReviewAggergation;
  CardHeaderProps?: CardHeaderProps;
}) => {
  const history = useHistory();

  return (
    <CardHeader
      onClick={() => {
        history.push(makeUserPageRoute({ userId: review.author.id }));
      }}
      avatar={<AvatarUser user={review.author} />}
      title={review.author.username}
      subheader={pluralize(review.authorReviewCount, "review")}
      {...CardHeaderProps}
    />
  );
};

export const CardHeaderMedia = ({
  review,
  CardHeaderProps,
}: {
  review: ReviewAggergation;
  CardHeaderProps?: CardHeaderProps;
}) => {
  const history = useHistory();

  return (
    <CardHeader
      onClick={() => {
        history.push(
          `/${review.review.mediaId.tmdbMediaType}/${review.review.mediaId.tmdbMediaId}`
        );
      }}
      avatar={<MovieAvatar movie={review.tmdbData} />}
      title={review.tmdbData.title}
      subheader={pluralize(review.mediaReviewCount, "review")}
      {...CardHeaderProps}
    />
  );
};

const toPublishedAt = (date: any) =>
  moment(date, "YYYYMMDD").fromNow().replace("a ", "1 ");

const ReviewCardContent = ({ review }: { review: ReviewAggergation }) => {
  return (
    <CardContent>
      <Box display="flex" alignItems="center" paddingBottom={1}>
        <Box marginRight={1}>
          <Rating
            precision={0.5}
            value={review.review.rating}
            readOnly
            size="small"
          />
        </Box>

        <Typography variant="subtitle2" color="textSecondary">
          {toPublishedAt(new Date(review.review.createdAt))}
        </Typography>
      </Box>

      <Typography style={{ wordBreak: "break-word" }} variant="body1">
        {review.review.content}
      </Typography>
    </CardContent>
  );
};

type Props = {
  review: ReviewAggergation;
  showAuthor?: boolean;
  showMedia?: boolean;
  onVoteUp?: () => void;
  onVoteDown?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default (props: Props) => {
  const {
    showMedia,
    showAuthor,
    onEdit,
    onDelete,
    onVoteDown,
    onVoteUp,
    review,
  } = props;

  const isReviewOptionsOpen = useBoolean(false);

  const CardHeaderProps = {
    action: (onEdit || onDelete) && (
      <MoreButton
        onClick={(event) => {
          event.stopPropagation();
          isReviewOptionsOpen.setTrue();
        }}
      />
    ),
  };

  const onClose = () => {
    isReviewOptionsOpen.setFalse();
  };

  return (
    <React.Fragment>
      <ReviewCardOptionsModal
        open={isReviewOptionsOpen.value}
        onClose={onClose}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <Card>
        {showMedia && (
          <CardHeaderMedia CardHeaderProps={CardHeaderProps} review={review} />
        )}
        {showAuthor && (
          <CardHeaderAuthor CardHeaderProps={CardHeaderProps} review={review} />
        )}
        <ReviewCardContent review={review} />
        <ReviewCardActions
          review={review}
          onVoteDown={onVoteDown}
          onVoteUp={onVoteUp}
        />
      </Card>
    </React.Fragment>
  );
};

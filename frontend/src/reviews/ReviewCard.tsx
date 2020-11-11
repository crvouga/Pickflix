import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import MovieAvatar from "../movie/components/MovieAvatar";
import AvatarUser from "../users/AvatarUser";
import { pluralize } from "../utils";
import { ReviewAggergation } from "./query/types";
import { EditButton, VoteDownButton, VoteUpButton } from "./ReviewCardButtons";

type Props = {
  review: ReviewAggergation;
  showUser?: boolean;
  showMedia?: boolean;
  onVoteUp?: () => void;
  onVoteDown?: () => void;
  onEdit?: () => void;
};

const toPublishedAt = (date: any) =>
  moment(date, "YYYYMMDD").fromNow().replace("a ", "1 ");

export default ({
  review,
  showUser,
  showMedia,
  onVoteUp,
  onVoteDown,
  onEdit,
}: Props) => {
  const history = useHistory();

  return (
    <Card>
      {showMedia && (
        <CardActionArea
          onClick={() => {
            history.push(`/movie/${review.tmdbData.id}`);
          }}
        >
          <CardHeader
            avatar={<MovieAvatar movie={review.tmdbData} />}
            title={review.tmdbData.title}
            subheader={pluralize(review.mediaReviewCount, "review")}
          />
        </CardActionArea>
      )}
      {showUser && (
        <CardActionArea
          onClick={() => {
            history.push(`/user/${review.author.username}`);
          }}
        >
          <CardHeader
            avatar={<AvatarUser user={review.author} />}
            title={review.author.username}
            subheader={pluralize(review.authorReviewCount, "review")}
          />
        </CardActionArea>
      )}
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
        <Typography variant="h6">{review.review.title}</Typography>
        <Typography variant="body2">{review.review.content}</Typography>
      </CardContent>
      <CardActions>
        {onEdit && <EditButton onClick={onEdit} />}
        {onVoteUp && <VoteUpButton onClick={onVoteUp} review={review} />}
        {onVoteDown && <VoteDownButton onClick={onVoteDown} review={review} />}
      </CardActions>
    </Card>
  );
};
import {Handler, IRouter} from 'express';
import {body, param, query, validationResult} from 'express-validator';
import {TmdbMediaId, TmdbMediaType} from '../../media/models/types';
import {User} from '../../users/models/make-user';
import {ReviewId} from '../models/make-review';
import {ReviewVoteValue} from '../models/make-review-vote';
import {Dependencies} from './types';

const handleValidationResult: Handler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  next();
};

export const buildReviewsRouter = ({
  reviewLogic,
  middlewares,
}: Dependencies) => (router: IRouter) => {
  router.get('/reviews');

  router.get(
    '/reviews',
    middlewares.protected,
    query('tmdbMediaId').isInt(),
    query('tmdbMediaType').isIn(Object.values(TmdbMediaType)),
    handleValidationResult,
    async (req, res, next) => {
      try {
        const currentUser = req.user as User;
        const tmdbMediaId = Number(req.query.tmdbMediaId) as TmdbMediaId;
        const tmdbMediaType = req.query.tmdbMediaType as TmdbMediaType;

        const reviewAggergations = await reviewLogic.getAllAggergationsForMedia(
          {
            userId: currentUser?.id,
            tmdbMediaId,
            tmdbMediaType,
          }
        );

        res.status(200).json(reviewAggergations).end();
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  );

  router.delete(
    '/reviews/:reviewId',
    middlewares.protected,
    param('reviewId').isUUID(),
    handleValidationResult,
    async (req, res, next) => {
      try {
        const reviewId = req.params.reviewId as ReviewId;
        await reviewLogic.removeReviews([{id: reviewId}]);
        res.status(204).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/reviews',
    middlewares.protected,
    body('content').isString(),
    body('tmdbMediaId').isInt(),
    body('tmdbMediaType').isIn(Object.values(TmdbMediaType)),
    handleValidationResult,
    async (req, res, next) => {
      try {
        const currentUser = req.user as User;
        const authorId = currentUser.id;

        const content = req.body.content as string;
        const tmdbMediaId = Number(req.body.tmdbMediaId) as TmdbMediaId;
        const tmdbMediaType = req.body.tmdbMediaType as TmdbMediaType;

        const review = await reviewLogic.addReview({
          authorId,
          content,
          tmdbMediaId,
          tmdbMediaType,
        });

        res.status(201).json(review).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch(
    '/reviews/:reviewId',
    middlewares.protected,
    param('reviewId').isUUID(),
    body('content').isString(),
    handleValidationResult,
    async (req, res, next) => {
      try {
        const currentUser = req.user as User;
        const authorId = currentUser.id;
        const reviewId = req.params.reviewId as ReviewId;
        const content = req.body.content as string;

        const review = await reviewLogic.editReview({
          id: reviewId,
          authorId,
          content,
        });

        res.status(201).json(review).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/reviews/:reviewId/review-votes',
    middlewares.protected,
    body('voteValue').isIn(Object.values(ReviewVoteValue)),
    param('reviewId').isUUID(),
    handleValidationResult,
    async (req, res, next) => {
      try {
        const currentUser = req.user as User;
        const userId = currentUser.id;
        const reviewId = req.params.reviewId as ReviewId;
        const voteValue = req.body.voteValue as ReviewVoteValue;

        const reviewVote = await reviewLogic.castReviewVote({
          userId,
          reviewId,
          voteValue,
        });
        res.status(201).json(reviewVote).end();
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/reviews/:reviewId/review-votes',
    middlewares.protected,
    param('reviewId').isUUID(),
    handleValidationResult,
    async (req, res, next) => {
      try {
        const currentUser = req.user as User;
        const userId = currentUser.id;
        const reviewId = req.params.reviewId as ReviewId;

        await reviewLogic.uncastReviewVote({
          reviewId,
          userId,
        });
        res.status(204).end();
      } catch (error) {
        next(error);
      }
    }
  );
};

import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import backendAPI from "../backendAPI";
import NavigationBarFadeIn from "../common/NavigationBarFadeIn";
import ErrorPage from "../common/page/ErrorPage";
import LoadingPage from "../common/page/LoadingPage";
import { actions } from "../redux";
import {
  MovieCredits,
  MovieDetails,
  MovieImages,
  MovieKeywords,
  MovieRecommendations,
  MovieReleaseDates,
  MovieReviews,
  MovieSimilar,
  MovieVideos,
} from "../tmdb/types";
import ActionBar from "./action-bar/ActionBar";
import CollectionSection from "./collection/CollectionSection";
import MoviePosterCardScroll from "./components/MoviePosterCardScroll";
import CreditsSection from "./credits/CreditsSection";
import DetailsSection from "./details/DetailsSection";
import DiscoverSection from "./discover/DiscoverSection";
import HeaderSection from "./header/HeaderSection";
import ReviewSection from "./review/ReviewSection";
import { toReleaseYear } from "./utils";
import VideosSection from "./video/VideosSection";

const fetchMoviePage = (movieId: string) =>
  backendAPI
    .get(`/api/tmdb/movie/${movieId}`, {
      params: {
        appendToResponse: [
          "credits",
          "reviews",
          "similar",
          "recommendations",
          "keywords",
          "videos",
          "images",
          "release_dates",
        ],
      },
    })
    .then((response) => response.data);

export default () => {
  const { movieId } = useParams<{ movieId: string }>();

  const query = useQuery<
    {
      credits: MovieCredits;
      reviews: MovieReviews;
      keywords: MovieKeywords;
      images: MovieImages;
      similar: MovieSimilar;
      recommendations: MovieRecommendations;
      videos: MovieVideos;
      releaseDates: MovieReleaseDates;
    } & MovieDetails,
    string
  >(`/movie/${movieId}`, () => fetchMoviePage(movieId), {});

  const dispatch = useDispatch();

  useEffect(() => {
    if (query.status === "success") {
      dispatch(
        actions.recentlyViewed.viewed({ mediaType: "movie", ...query.data })
      );
    }
  }, [dispatch, query.data, query.status]);

  if (query.status === "error") {
    return <ErrorPage />;
  }

  if (query.status === "loading") {
    return (
      <React.Fragment>
        <NavigationBarFadeIn />
        <LoadingPage />
      </React.Fragment>
    );
  }

  const {
    credits,
    reviews,
    keywords,
    images,
    similar,
    videos,
    recommendations,
    releaseDates,
    ...details
  } = query.data;

  return (
    <React.Fragment>
      <NavigationBarFadeIn
        title={details.title}
        subtitle={toReleaseYear(details)}
      />

      <HeaderSection details={details} releaseDates={releaseDates} />

      <Box width="100%" bgcolor="background.default">
        <ActionBar />

        <VideosSection videos={videos} />

        <DetailsSection
          details={details}
          releaseDates={releaseDates}
          keywords={keywords}
        />

        <CreditsSection credits={credits} />

        {details.belongsToCollection && (
          <CollectionSection collection={details.belongsToCollection} />
        )}

        <MoviePosterCardScroll
          title="People also like"
          movies={[...similar.results, ...recommendations.results]}
        />

        <DiscoverSection details={details} keywords={keywords} />

        <ReviewSection reviews={reviews} />
      </Box>
    </React.Fragment>
  );
};

import { BackendAPI } from "../backend-api";
import {
  Paginated,
  Movie,
  Person,
  MovieReviews,
  TmdbConfiguration,
} from "./types";

export const queryKeys = {
  tmdbConfiguration: () => ["tmdb", "configuration"],
  video: (tmdbMediaId: string) => ["video", tmdbMediaId],
  movieReviews: (tmdbMediaId: string) => ["movie", tmdbMediaId, "reviews"],
  searchMovies: ({ query }: { query: string }) => ["search", "movie", query],
};

export const getTmdbMovieReviews = async ({
  tmdbMediaId,
}: {
  tmdbMediaId: string;
}) => {
  const { data } = await BackendAPI.get<MovieReviews>(
    `/api/tmdb/movie/${tmdbMediaId}/reviews`
  );
  return data;
};

export const getTmdbConfiguration = async () => {
  const { data } = await BackendAPI.get<TmdbConfiguration>(
    "/api/tmdb/configuration"
  );
  return data;
};

export const getPopularMovies = async () => {
  const { data } = await BackendAPI.get<Paginated<Movie>>(
    "/api/tmdb/movie/popular"
  );
  return data;
};

export const getPopularPersons = async () => {
  const { data } = await BackendAPI.get<Paginated<Person>>(
    "/api/tmdb/person/popular"
  );
  return data;
};

export const getUpcomingMovies = async () => {
  const { data } = await BackendAPI.get<Paginated<Movie>>(
    "/api/tmdb/movie/upcoming"
  );
  return data;
};

export const getTopRatedMovies = async () => {
  const { data } = await BackendAPI.get<Paginated<Movie>>(
    "/api/tmdb/discover/movie?vote_count.gte=8000&vote_average.gte=8.0"
  );
  return data;
};

export const getNowPlayingMovies = async () => {
  const { data } = await BackendAPI.get<Paginated<Movie>>(
    "/api/tmdb/movie/nowPlaying"
  );
  return data;
};

export const getSearchMovies = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const { data } = await BackendAPI.get<Paginated<Movie>>(
    "/api/tmdb/search/movie",
    {
      params: {
        query,
        page,
      },
    }
  );
  return data;
};
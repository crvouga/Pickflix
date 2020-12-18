import dotenv from "dotenv";

dotenv.config();

export type NodeEnv = "test" | "development" | "production";

export const castNodeEnv = (env: any = "development"): NodeEnv => {
  if (env === "development" || env === "test" || env === "production") {
    return env;
  }
  throw new Error("failed to cast node env");
};

export const getNodeEnv = () =>
  castNodeEnv(process.env.NODE_ENV || "development");

export type RepositoryImplementation = "postgres" | "hashMap" | "fileSystem";

export const castRepositoryImplementation = (
  repositoryImplementation: any
): RepositoryImplementation => {
  if (
    repositoryImplementation === "postgres" ||
    repositoryImplementation === "hashMap" ||
    repositoryImplementation === "fileSystem"
  ) {
    return repositoryImplementation;
  }
  throw new Error("failed to cast repository implementation");
};

export const getRepositoryImplementation = () =>
  castRepositoryImplementation(
    process.env.REPOSITORY_IMPLEMENTATION || "hashMap"
  );

export type Secrets = Readonly<{
  // used for database
  // used by Heroku postgres addon
  // SOURCE: https://dashboard.heroku.com/apps/crvouga-pickflix
  posgresConnectionString: string;

  // used for cache
  // used by Heroku redis addon
  // SOURCE: https://dashboard.heroku.com/apps/crvouga-pickflix
  redisConnectionString: string;

  // for movie data
  // SOURCE: https://www.themoviedb.org/settings/api.
  tmdbApiKey: string;

  // for youtube data
  // SOURCE: https://console.developers.google.com/apis/api/youtube.googleapis.com/credentials?project=pickflix.
  youtubeApiKey: string;

  // for sending emails
  // SOUCRE: https://app.sendgrid.com
  sendGridApiKey: string;

  // secret for making secrets
  secret: string;

  //
  sessionCookieSecret: string;
}>;

const {
  YOUTUBE_API_KEY,
  TMDB_API_KEY,
  DATABASE_URL,
  SEND_GRID_API_KEY,
  SECRET,
  SESSION_COOKIE_SECRET,
  REDIS_URL,
} = process.env;

if (!YOUTUBE_API_KEY) {
  throw "YOUTUBE_API_KEY required";
}

if (!TMDB_API_KEY) {
  throw "TMDB_API_KEY required";
}

if (!DATABASE_URL) {
  throw "DATABASE_URL required";
}

if (!REDIS_URL) {
  throw new Error("REDIS_URL required");
}

if (!SEND_GRID_API_KEY) {
  throw "SEND_GRID_API_KEY required";
}

if (!SECRET) {
  throw "SECRET required";
}

if (!SESSION_COOKIE_SECRET) {
  throw new Error("DATABASE_URL required");
}

export const secrets: Secrets = {
  posgresConnectionString: DATABASE_URL,
  redisConnectionString: REDIS_URL,
  tmdbApiKey: TMDB_API_KEY,
  youtubeApiKey: YOUTUBE_API_KEY,
  sendGridApiKey: SEND_GRID_API_KEY,
  secret: SECRET,
  sessionCookieSecret: SESSION_COOKIE_SECRET,
};

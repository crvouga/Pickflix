import { Movie } from "../../tmdb/types";

export type ListItem = {
  id: string;
  tmdbMediaId: string;
  tmdbMediaType: "movie" | "person";
  listId: string;
};

export type ListItemAggergation = {
  listItem: ListItem;
  tmdbData: Movie;
};

export type List = {
  id: string;
  title: string;
  description: string;
  isAutoCreated: boolean;
  createdAt: string;
  visibility: "public" | "private";
};

export type ListAggergation = {
  list: List;
  //
  listItemCount: number;
  listItems: ListItemAggergation[];
};

export type AutoListKey = "watch-next" | "liked";

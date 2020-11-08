import {
  TmdbMediaId,
  TmdbMediaType,
  TmdbMedia,
} from "../../media/models/types";
import { UserId } from "../../users/models/make-user";
import { Id } from "../../id/types";
import { ListId } from ".";
import { makeId, isValidId } from "../../id";

export type ListItemId = Id & { ListItemId: true };

export type ListItem = {
  type: "listItem";
  id: ListItemId;
  userId: UserId;
  listId: ListId;
  createdAt: number;
} & TmdbMedia;

export type PartialListItem = {
  id?: ListItemId;
  userId: UserId;
  listId: ListId;
  tmdbMediaId: TmdbMediaId;
  tmdbMediaType: TmdbMediaType;
  createdAt?: number;
};

export const makeListItem = (partial: PartialListItem): ListItem => {
  const {
    id = makeId() as ListItemId,
    createdAt = Date.now(),
    userId,
    listId,
    tmdbMediaId,
    tmdbMediaType,
  } = partial;

  if (!isValidId(id)) {
    throw new Error("invalid id");
  }

  if (!isValidId(listId)) {
    throw new Error("invalid list id");
  }

  if (!isValidId(userId)) {
    throw new Error("invalid user id");
  }

  return Object.freeze({
    type: "listItem",
    id,
    userId,
    listId,
    tmdbMediaId,
    tmdbMediaType,
    createdAt,
  });
};

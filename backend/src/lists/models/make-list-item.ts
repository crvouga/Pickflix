import {Dependencies, ListItem} from './types';

export const buildMakeListItem = ({makeId, isValidId}: Dependencies) => (
  listItemInfo: Partial<ListItem>
): ListItem => {
  const {
    id = makeId(),
    listId,
    tmdbMediaId,
    tmdbMediaType,
    createdAt = Date.now(),
  } = listItemInfo;

  if (!isValidId(id)) {
    throw new Error('invalid id');
  }

  if (!listId) {
    throw new Error('list id required');
  }

  if (!isValidId(listId)) {
    throw new Error('invalid list id');
  }

  if (!tmdbMediaId) {
    throw new Error('tmdb id required');
  }

  if (tmdbMediaId && tmdbMediaId.length === 0) {
    throw new Error('invalid tmdb id');
  }

  if (!tmdbMediaType) {
    throw new Error('tmdb media type required');
  }

  if (!['movie', 'tv'].includes(tmdbMediaType)) {
    throw new Error('invalid tmdb media type');
  }

  return {
    type: 'listItem',
    id,
    listId,
    tmdbMediaId,
    tmdbMediaType,
    createdAt,
  };
};

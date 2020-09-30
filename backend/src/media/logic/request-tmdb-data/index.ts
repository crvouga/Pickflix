import {camelizeKeys, decamelize, decamelizeKeys} from 'humps';
import qs from 'qs';
import config from '../../../configuration';
import {MediaLogic} from '../build';

const timeToLive = 1000 * 60 * 60 * 24 * 1;

export async function requestTmdbData(
  this: MediaLogic,
  {
    path,
    query,
  }: {
    path: string;
    query?: {
      [key: string]: string;
    };
  }
) {
  const params = decamelizeKeys({
    ...query,
    apiKey: config.TMDbAPIKey,
  });

  const url = [
    decamelize(path),
    '?',
    qs.stringify(params, {
      arrayFormat: 'comma',
      encode: false,
    }),
  ].join('');

  const cahced = await this.keyv.get(url);

  if (cahced) {
    return cahced;
  }

  const tmdbResponse = await this.axios({
    method: 'get',
    url: 'https://api.themoviedb.org/3' + url,
  });

  const data = camelizeKeys(tmdbResponse.data);

  await this.keyv.set(url, data, timeToLive);

  return data;
}
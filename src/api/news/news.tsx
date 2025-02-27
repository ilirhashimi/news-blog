import { request } from '../api.service';
import { TNews } from './news.types';

const {
  REACT_APP_NEWS_API_API_BASE_URL,
  REACT_APP_NEW_YORK_TIME_API_BASE_URL,
  REACT_APP_THE_GUARDIAN_API_BASE_URL,
  REACT_APP_NEWS_API_API_KEY,
  REACT_APP_NEW_YORK_TIME_API_KEY,
  REACT_APP_THE_GUARDIAN_API_KEY,
} = process.env;

export const _News: TNews = {
  getNewsApi: async (params) => {
    try {
      const { data } = await request({
        method: 'GET',
        url: `${REACT_APP_NEWS_API_API_BASE_URL}?apiKey=${REACT_APP_NEWS_API_API_KEY}&pageSize=10`,
        params,
      });
      return data;
    } catch (err) {
      throw err;
    }
  },
  getNYTimes: async (params) => {
    let url = `${REACT_APP_NEW_YORK_TIME_API_BASE_URL}svc/search/v2/articlesearch.json?api-key=${REACT_APP_NEW_YORK_TIME_API_KEY}`;

    try {
      const { data } = await request({
        method: 'GET',
        url: url,
        params,
      });
      return data;
    } catch (err) {
      throw err;
    }
  },
  getTheGuardianApi: async (params) => {
    let url = `${REACT_APP_THE_GUARDIAN_API_BASE_URL}?show-elements=image&show-fields=headline,byline,trailText,thumbnail,firstPublicationDate&api-key=${REACT_APP_THE_GUARDIAN_API_KEY}`;
    try {
      const { data } = await request({
        method: 'GET',
        url: url,
        params,
      });
      return data;
    } catch (err) {
      throw err;
    }
  },
};

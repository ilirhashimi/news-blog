import {
  IArticle,
  INewYorkTimesDoc,
  TTheGuardianResponseResult,
} from '../api/news/news.types';
import { TArticles } from '../contexts/news/news.types';

const { REACT_APP_NEW_YORK_TIME_API_IMAGE_URL } = process.env;

export const transformNYTArticles = (
  response: INewYorkTimesDoc[]
): TArticles[] => {
  return response.map((article) => ({
    title: article.headline.main,
    description: article.abstract,
    author: article.byline?.original,
    urlToImage: article.multimedia?.[0]?.url
      ? `${REACT_APP_NEW_YORK_TIME_API_IMAGE_URL}${article.multimedia[0].url}`
      : '',
    publishedAt: article.pub_date,
    articleUrl: article.web_url,
  }));
};

export const transformTheGuardianArticles = (
  response: TTheGuardianResponseResult[]
): TArticles[] => {
  return response.map((article) => ({
    title: article.fields?.headline || article.webTitle,
    author: article.fields.byline,
    description: article.fields?.trailText || '',
    urlToImage: article.fields.thumbnail,
    publishedAt: article.fields.firstPublicationDate,
    articleUrl: article.webUrl,
  }));
};

export const transformNewsApiArticles = (response: IArticle[]): TArticles[] => {
  return response.map((article) => ({
    title: article.title,
    author: article.author || 'Unknown',
    description: article.description,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt,
    articleUrl: article.url,
  }));
};

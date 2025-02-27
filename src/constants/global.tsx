export enum DATA_SOURCE_ENUM {
  NEW_YORK_ITEMS = 'new-york-times',
  THE_GUARDIAN = 'the-guardian',
  NEWS_API = 'news-api',
}

export enum LOCAL_STORAGE_VALUES {
  DATA_SOURCE = 'data_source',
  SORT = 'sort',
  CATEGORY = 'category',
}

export const DATA_SOURCE = [
  { id: DATA_SOURCE_ENUM.NEW_YORK_ITEMS, label: 'New York Times' },
  { id: DATA_SOURCE_ENUM.THE_GUARDIAN, label: 'The Guardian' },
  { id: DATA_SOURCE_ENUM.NEWS_API, label: 'NewsAPI' },
];

export const SORT_OPTIONS = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'newest', label: 'Newest' },
  { id: 'oldest', label: 'Oldest' },
];

export const ARTICLE_CATEGORIES = [
  { id: 'business', label: 'Business' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'general', label: 'General' },
  { id: 'health', label: 'Health' },
  { id: 'science', label: 'Science' },
  { id: 'sport', label: 'Sport' },
  { id: 'technology', label: 'Technology' },
];

import { createContext, useCallback, useEffect, useState } from 'react';
import { IContext, IState } from './news.types';
import { TProvider } from '../../index.types';
import { _News } from '../../api/news/news';
import {
  IGetNewsApiParams,
  IGetNYTimesParams,
  IGetTheGuardianParams,
} from '../../api/news/news.types';
import moment from 'moment';
import {
  transformNewsApiArticles,
  transformNYTArticles,
  transformTheGuardianArticles,
} from '../../unit/response-transformation';
import { useSnackbar } from 'notistack';
import { DATA_SOURCE_ENUM, LOCAL_STORAGE_VALUES } from '../../constants/global';

const NewsContext = createContext({} as IContext);

const getInitialState = (): IState => ({
  articles: [],
  dataSource: localStorage.getItem(LOCAL_STORAGE_VALUES.DATA_SOURCE) || '',
  from: null,
  to: null,
  keyWord: '',
  category: localStorage.getItem(LOCAL_STORAGE_VALUES.CATEGORY) || '',
  numberOfResults: 0,
  sort: localStorage.getItem(LOCAL_STORAGE_VALUES.SORT) || '',
  page: 1,
  loader: false,
  filterIsOpen: false,
});

const NewsProvider: TProvider = ({ children }) => {
  const [state, setState] = useState<IState>(getInitialState);
  const { enqueueSnackbar } = useSnackbar();

  const getNewsApi = useCallback(
    async (page: number = 0) => {
      const { keyWord, from, to, category } = state;
      if (!keyWord?.trim() && !category?.trim()) {
        enqueueSnackbar('Please filter by keyword or category', {
          variant: 'info',
        });
        return;
      }

      try {
        setState((prevState) => ({ ...prevState, loader: true }));
        const params: IGetNewsApiParams = {
          ...(keyWord && { q: keyWord }),
          ...(from && { from: moment(from).format('YYYY-MM-DD') }),
          ...(to && { to: moment(to).format('YYYY-MM-DD') }),
          ...(category && { category: category }),
          ...(page && { page }),
        };
        const data = await _News.getNewsApi(params);
        if (data.status === 'ok') {
          setState((prevState) => ({
            ...prevState,
            articles: transformNewsApiArticles(data.articles),
            numberOfResults: data.totalResults,
          }));
        }
      } catch (err) {
        console.error(err);
        enqueueSnackbar(err as string, { variant: 'error' });
      } finally {
        setState((prevState) => ({ ...prevState, loader: false }));
      }
    },
    [state, setState, enqueueSnackbar]
  );

  const getNewYorkTimes = useCallback(
    async (page: number = 0) => {
      setState((prevState) => ({ ...prevState, loader: true }));

      try {
        const { keyWord, from, to, sort, category } = state;
        const params: IGetNYTimesParams = {
          ...(keyWord && { q: keyWord }),
          ...(from && { begin_date: moment(from).format('YYYYMMDD') }),
          ...(to && { end_date: moment(to).format('YYYYMMDD') }),
          ...(sort && { sort: sort }),
          ...(page && { page }),
          ...(category && { fq: category }),
        };

        const data = await _News.getNYTimes(params);
        if (data.status === 'OK') {
          setState((prevState) => ({
            ...prevState,
            articles: transformNYTArticles(data.response.docs),
            numberOfResults: data.response.meta.hits,
          }));
        }
      } catch (err) {
        console.error(err);
        enqueueSnackbar(err as string, { variant: 'error' });
      } finally {
        setState((prevState) => ({ ...prevState, loader: false }));
      }
    },
    [state, setState, enqueueSnackbar]
  );

  const getTheGuardian = useCallback(
    async (page: number = 0) => {
      setState((prevState) => ({ ...prevState, loader: true }));

      try {
        const { keyWord, from, to, sort, category } = state;

        const params: IGetTheGuardianParams = {
          ...(keyWord && { q: keyWord }),
          ...(from && { 'from-date': moment(from).format('YYYY-MM-DD') }),
          ...(to && { 'to-date': moment(to).format('YYYY-MM-DD') }),
          ...(sort && { 'order-by': sort }),
          ...(category && { section: category }),
          ...(page && { page }),
        };
        const data = await _News.getTheGuardianApi(params);
        if (data.response.status === 'ok') {
          setState((prevState) => ({
            ...prevState,
            articles: transformTheGuardianArticles(data.response.results),
            numberOfResults: data.response.total,
          }));
        }
      } catch (err) {
        console.error(err);
        enqueueSnackbar(err as string, { variant: 'error' });
      } finally {
        setState((prevState) => ({ ...prevState, loader: false }));
      }
    },
    [state, setState, enqueueSnackbar]
  );

  const getNews = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      page: 1,
    }));
    closeFilter();
    if (state.dataSource === DATA_SOURCE_ENUM.NEWS_API) {
      getNewsApi();
    } else if (state.dataSource === DATA_SOURCE_ENUM.NEW_YORK_ITEMS) {
      getNewYorkTimes();
    } else if (state.dataSource === DATA_SOURCE_ENUM.THE_GUARDIAN) {
      getTheGuardian();
    }
  }, [state]);

  const saveFilters = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_VALUES.DATA_SOURCE);
    localStorage.removeItem(LOCAL_STORAGE_VALUES.SORT);
    localStorage.removeItem(LOCAL_STORAGE_VALUES.CATEGORY);
    if (state.dataSource)
      localStorage.setItem(LOCAL_STORAGE_VALUES.DATA_SOURCE, state.dataSource);
    if (state.sort) localStorage.setItem(LOCAL_STORAGE_VALUES.SORT, state.sort);
    if (state.category)
      localStorage.setItem(LOCAL_STORAGE_VALUES.CATEGORY, state.category);
    getNews();
  }, [state]);

  const openFilter = useCallback(() => {
    setState((prevState) => ({ ...prevState, filterIsOpen: true }));
  }, [state.filterIsOpen]);

  const closeFilter = useCallback(() => {
    setState((prevState) => ({ ...prevState, filterIsOpen: false }));
  }, [state.filterIsOpen]);

  useEffect(() => {
    if (!state.dataSource) {
      setState((prevState) => ({
        ...prevState,
        dataSource: DATA_SOURCE_ENUM.NEW_YORK_ITEMS,
      }));
      getNewYorkTimes();
    }
  }, []);

  useEffect(() => {
    if (state.dataSource === DATA_SOURCE_ENUM.NEW_YORK_ITEMS) {
      getNewYorkTimes(state.page);
    } else if (state.dataSource === DATA_SOURCE_ENUM.THE_GUARDIAN) {
      getTheGuardian(state.page);
    } else if (state.dataSource === DATA_SOURCE_ENUM.NEWS_API) {
      getNewsApi(state.page);
    }
  }, [state.page]);

  return (
    <NewsContext.Provider
      value={{ state, setState, getNews, saveFilters, openFilter, closeFilter }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export { NewsProvider, NewsContext };

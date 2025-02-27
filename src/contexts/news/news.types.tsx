import moment from 'moment';

export interface IContext {
  state: IState;
  setState: React.Dispatch<React.SetStateAction<IState>>;
  getNews: () => void;
  saveFilters: () => void;
  openFilter: () => void;
  closeFilter: () => void;
}

export interface IState {
  dataSource: string;
  articles: TArticles[];
  from: moment.Moment | null;
  to: moment.Moment | null;
  keyWord: string;
  category: string;
  sort: string;
  numberOfResults: number;
  page: number;
  loader: boolean;
  filterIsOpen: boolean;
}

export type TArticles = {
  title: string;
  description: string;
  author: string;
  urlToImage: string;
  publishedAt: string;
  articleUrl: string;
};

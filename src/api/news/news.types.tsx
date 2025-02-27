export type TNews = {
  getNewsApi: (params: IGetNewsApiParams) => Promise<INewsApiResponse>;
  getNYTimes: (
    params: IGetNYTimesParams
  ) => Promise<INewYorkTimesDefaultResponse>;
  getTheGuardianApi: (params: any) => Promise<IGetTheGuardianResponse>;
};

/***  News Api ***/

export interface IGetNewsApiParams {
  q?: string;
  sources?: string;
  category?: string;
  from?: string;
  to?: string;
  page?: number;
}

export interface INewsApiResponse {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

export interface IArticle {
  source: IArticleSource;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface IArticleSource {
  id: any;
  name: string | null;
}

/*** New York Times News Api ***/

export interface IGetNYTimesParams {
  q?: string;
  begin_date?: string;
  end_date?: string;
  page?: number;
  sort?: string;
  fq?: string;
}

export interface INewYorkTimesDefaultResponse {
  status: string;
  copyright: string;
  response: INewYorkTimeResponse;
}

export interface INewYorkTimeResponse {
  docs: INewYorkTimesDoc[];
  meta: INewYorkTimesMeta;
}

export interface INewYorkTimesDoc {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  print_section: string;
  print_page: string;
  source: string;
  multimedia: INewYorkTimesMultimedum[];
  headline: INewYorkTimesHeadline;
  keywords: INewYorkTimesKeyword[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: INewYorkTimesPersonByline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface INewYorkTimesMultimedum {
  rank: number;
  subtype: string;
  caption: any;
  credit: any;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: INewYorkTimesPersonLegacy;
  subType: string;
  crop_name: string;
}

export interface INewYorkTimesPersonLegacy {
  xlarge: string;
  xlargewidth: number;
  xlargeheight: number;
}

export interface INewYorkTimesHeadline {
  main: string;
  kicker: string;
  content_kicker: any;
  print_headline: string;
  name: any;
  seo: any;
  sub: any;
}

export interface INewYorkTimesKeyword {
  name: string;
  value: string;
  rank: number;
  major: string;
}

export interface INewYorkTimesPersonByline {
  original: string;
  person: INewYorkTimesPerson[];
  organization: any;
}

export interface INewYorkTimesPerson {
  firstname: string;
  middlename: any;
  lastname: string;
  qualifier: any;
  title: any;
  role: string;
  organization: string;
  rank: number;
}

export interface INewYorkTimesMeta {
  hits: number;
  offset: number;
  time: number;
}

/*** The Guardian News Api ***/

export interface IGetTheGuardianParams {
  q?: string;
  section?: string;
  'from-date'?: string;
  'to-date'?: string;
  'order-by'?: string;
  page?: number;
}

export interface IGetTheGuardianResponse {
  response: IGetTheGuardianResponseItems;
}

export interface IGetTheGuardianResponseItems {
  status: string;
  userTier: string;
  total: number;
  startIndex: number;
  pageSize: number;
  currentPage: number;
  pages: number;
  orderBy: string;
  results: TTheGuardianResponseResult[];
}

export type TTheGuardianResponseResult = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields: TTheGuardianResponseField;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  elements?: TTheGuardianResponseElement[];
};

type TTheGuardianResponseField = {
  headline: string;
  trailText: string;
  byline: string;
  firstPublicationDate: string;
  thumbnail: string;
};

type TTheGuardianResponseElement = {
  id: string;
  relation: string;
  type: string;
  assets: TTheGuardianResponseAsset[];
};

type TTheGuardianResponseAsset = {
  type: string;
  file: string;
  typeData: TTheGuardianResponseTypeData;
  mimeType?: string;
};

type TTheGuardianResponseTypeData = {
  altText: string;
  credit: string;
  photographer?: string;
  source: string;
  width: string;
  height: string;
  secureFile: string;
  displayCredit: string;
  mediaId: string;
  imageType: string;
  suppliersReference?: string;
  caption?: string;
  role?: string;
};

export type TRequest = (params: {
  method: 'get' | 'GET';
  url: string;
  params?: any;
}) => any;

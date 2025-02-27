import axios, { AxiosRequestConfig } from 'axios';
import { TRequest } from './api.service.types';

export const request: TRequest = async ({ method, url, params = {} }) => {
  let options: AxiosRequestConfig = {
    method,
    url,
    params,
  };

  try {
    const response = await axios(options);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An error occurred with the request';
      console.error('Axios error:', errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error('Unknown error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

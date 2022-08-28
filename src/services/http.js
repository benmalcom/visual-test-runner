import axios from 'axios';
import { isEmpty } from 'lodash';
import { FOODS_BASE_URL } from 'utils/constants';
// Default config options
const defaultOptions = {
  baseURL: FOODS_BASE_URL,
  'Content-Type': 'application/json',
  timedOut: 3000,
};

// Create instance
const instance = axios.create(defaultOptions);

instance.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);
// Add a response interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.code === 'ECONNABORTED')
        throw new Error('Network timeout, please try again');
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      error.message =
        'This request is taking too long, please check your network';
      throw error;
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
);
export default instance;

export const createRequest = config => instance(config);

export const composeRequestConfig = config => {
  const { method = 'get', payload, params, headers, ...rest } = config;
  const requestConfig = { method, ...rest };
  if (payload && (!isEmpty(payload) || payload instanceof FormData)) {
    requestConfig.data = payload;
  }
  if (params && !isEmpty(params)) {
    requestConfig.params = params;
  }
  if (headers) {
    requestConfig.headers = headers;
  }
  return requestConfig;
};

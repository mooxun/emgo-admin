import env from './env';

export default {
  baseURL: env.baseURL,
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  params: {},
  timeout: 10000,
  withCredentials: false,
  responseType: 'json',
  maxContentLength: 2000,
  validateStatus(status) {
    return status >= 200 && status < 500;
  },
  maxRedirects: 5,
  // transformRequest: [(data) => QS.stringify(data)],
  // paramsSerializer: (params) => QS.stringify(params),
  data: {},
};

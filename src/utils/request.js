import Vue from 'vue';
import axios from 'axios';
import config from '@/config/axios.conf';
import router from '@/router';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import notification from 'ant-design-vue/es/notification';

const request = axios.create(config);

const requestErr = (error) => {
  notification.error({
    message: 'Error Notice',
    description: 'Error: Network Error',
  });
  return Promise.reject(error);
};

// http request 拦截器
request.interceptors.request.use(
  (config) => {
    const token = Vue.ls.get(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, requestErr,
);

// http response 拦截器
request.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      // token过期
      Vue.ls.remove(ACCESS_TOKEN);
      router.replace({
        path: '/passport/login',
        query: {
          redirect: router.currentRoute.fullPath,
        },
      });
    } else if (response.data.code === 403) {
      notification.error({
        message: response.data.message,
      });
    }
    return response;
  }, requestErr,
);

export default request;

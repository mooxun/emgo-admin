import Vue from 'vue';
import Router from 'vue-router';
import { RoutersMap } from './routers';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: RoutersMap,
});

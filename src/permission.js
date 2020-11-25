import Vue from 'vue';
import router from './router';
import store from './store';

import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { setDocumentTitle, domTitle } from '@/utils/domUtil';
import { ACCESS_TOKEN } from '@/store/mutation-types';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['login']; // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`));
  if (Vue.ls.get(ACCESS_TOKEN)) {
    store.dispatch('GenerateRoutes');
    // 根据roles权限生成可访问的路由表
    // 动态添加可访问路由表
    const redirect = decodeURIComponent(from.query.redirect);
    if (to.path !== redirect && redirect !== 'undefined') {
      // 跳转到目的路由
      next({ path: redirect });
    }
    next();
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next({ path: '/passport/login', query: { redirect: to.fullPath } });
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

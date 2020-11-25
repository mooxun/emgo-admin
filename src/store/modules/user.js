import Vue from 'vue';
import env from '@/config/env';
import { ACCESS_TOKEN } from '@/store/mutation-types';

// initial state
const state = {
  token: '',
  name: '',
  welcome: '',
  avatar: '',
  roles: [],
  info: {},
};

const actions = {
  // 登录
  Login({ commit }, { accessToken }) {
    console.log(accessToken);
    Vue.ls.set(ACCESS_TOKEN, accessToken, env.tokenExpires);
    commit('SET_TOKEN', accessToken);
  },
  Logout() {
    Vue.ls.remove(ACCESS_TOKEN);
    Vue.ls.remove('userinfo');
  },
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, { name }) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_INFO: (state, info) => {
    state.info = info;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};

import Vue from 'vue';
import VueStorage from 'vue-ls';
import config from '@/config/defaultSettings';

// base library
import Antd from 'ant-design-vue';
import Viser from 'viser-vue';
import 'ant-design-vue/dist/antd.less';
import '@styles/public.scss';
// ext
import VueClipboard from 'vue-clipboard2';
import IconFontExt from './iconfontExt';
import EM from '@/utils/em';

VueClipboard.config.autoSetContainer = true;

Vue.use(Antd);
Vue.use(Viser);

Vue.use(VueStorage, config.storageOptions);
Vue.component('em-icon', IconFontExt);
Vue.use(VueClipboard);
Vue.use(EM);

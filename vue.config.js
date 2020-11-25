const path = require('path');
const webpack = require('webpack');

const resolve = dir => path.join(__dirname, dir);

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : '/';

module.exports = {
  publicPath: BASE_URL,

  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('@assets', resolve('src/assets'))
      .set('@styles', resolve('src/assets/styles'))
      .set('@images', resolve('src/assets/images'))
      .set('@C', resolve('src/components'));
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    port: 5100,
    overlay: {
      warnings: false,
      errors: true,
    },
    // proxy: 'localhost:3000'
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true,
      },
      scss: {
        additionalData: `@import "~@/assets/styles/colors.scss";`,
      },
    },
  },
};

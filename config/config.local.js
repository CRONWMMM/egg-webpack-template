/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {{}}
   **/
  const config = exports = {};

  // add your middleware config here
  config.middleware = [];

  // 开发环境下需要开启 webpack 编译
  config.webpack = {
    // port: 9000, // port: {Number}, default 9000. webpack dev server 的默认端口，默认为 9000，开启热更新时 websocket 的自动请求端口
    webpackConfigList: [ require('../build/webpack.dev.config') ],
  };

  // 开发环境下，将 egg-static 静态资源转发目录由默认的 /app/public 改为 /src/static （具体的转发地址可以自行定义）
  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'src/static'),
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

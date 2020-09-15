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

  config.webpack = {
    // port: 9000, // port: {Number}, default 9000. webpack dev server port, default 9000
    webpackConfigList: [ require('../build/webpack.dev.config') ],
  };

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

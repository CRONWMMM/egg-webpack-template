/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  webpack: { // 开发环境，开启 egg-webpack 插件
    enable: process.env.NODE_ENV === 'development',
    package: 'egg-webpack',
  },

  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },

  static: {
    enable: true,
    package: 'egg-static',
  },
};

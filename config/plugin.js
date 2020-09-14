/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  webpack: {
    enable: true,
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

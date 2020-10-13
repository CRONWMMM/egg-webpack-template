'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const { join, resolve } = require('path');
const devConfig = require('./config.dev');
const prodConfig = require('./config.prod');
const isDev = process.env.NODE_ENV === 'development';
const CONFIG = isDev ? devConfig : prodConfig;

module.exports = {
  entry: (filepathList => {
    const entry = {};
    filepathList.forEach(filepath => {
      const list = filepath.split(/(\/|\/\/|\\|\\\\)/g);
      const key = list[list.length - 1].replace(/\.js/g, '');
      // 如果是开发环境，才需要引入 hot module
      entry[key] = isDev ?
        [
          filepath,
          // 这边注意端口号，之间安装的 egg-webpack，会启动 dev-server，默认端口号为 9000
          `webpack-hot-middleware/client?path=http://127.0.0.1:${CONFIG.DEV_SERVER_PORT}/__webpack_hmr&noInfo=false&reload=true&quiet=false`,
        ] : filepath;
    });
    return entry;
  })(glob.sync(resolve(__dirname, '../src/js/*.js'))),

  output: {
    path: join(__dirname, '..', CONFIG.DIR.DIST),
    publicPath: CONFIG.PATH.PUBLIC_PATH,
    filename: `${CONFIG.DIR.SCRIPT}/[name].bundle.js`,
    chunkFilename: `${CONFIG.DIR.SCRIPT}/[name].[chunkhash].js`,
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      js: resolve(__dirname, '../src/js'),
      css: resolve(__dirname, '../src/css'),
      less: resolve(__dirname, '../src/less'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /(node_modules|lib|libs)/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash:5].[ext]',
            limit: 1024,
            outputPath: CONFIG.DIR.IMAGE,
          },
        },
      },
      {
        test: /\.(eot|woff2|woff|ttf|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash:5].[ext]',
            limit: 1024,
            outputPath: CONFIG.DIR.FONT,
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: [ 'img:src', 'img:data-src', ':data-background' ],
            },
          },
        ],
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: [ 'img:src', 'img:data-src', ':data-background' ],
            },
          },
          {
            loader: 'ejs-html-loader',
            options: {
              production: process.env.ENV === 'production',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
    // 打包文件
    ...glob.sync(resolve(__dirname, '../src/view/*.ejs'))
      .map(filepath => {
        const tempList = filepath.split(/(\/|\/\/|\\|\\\\)/g);
        const filename = `${CONFIG.DIR.VIEW}/${tempList[tempList.length - 1]}`;
        const template = filepath;
        const fileChunk = filename.split('.')[0].split(/(\/|\/\/|\\|\\\\)/g)
          .pop(); // eslint-disable-line
        const chunks = isDev ? [ fileChunk ] : [ 'manifest', 'vendors', fileChunk ];
        return new HtmlWebpackPlugin({
          filename: isDev ? filename : join(__dirname, '..', filename),
          template,
          chunks });
      }),
  ],
};

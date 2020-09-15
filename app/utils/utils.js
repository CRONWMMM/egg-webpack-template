const axios = require('axios');
// const ejs = require('ejs');
const CONFIG = require('../../build/config.dev');
const isDev = process.env.NODE_ENV === 'development';

function getTemplateString(filename) {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:${CONFIG.PORT}${CONFIG.PATH.PUBLIC_PATH}${CONFIG.DIR.VIEW}/${filename}`).then(res => {
      resolve(res.data);
    }).catch(reject);
  });
}

/**
 * render 方法
 * @param ctx egg 的 ctx 对象
 * @param filename 需要渲染的文件名
 * @param data ejs 渲染时需要用到的附加对象
 * @return {Promise<*|undefined>}
 */
async function render(ctx, filename, data = {}) {
  // 文件后缀
  const ext = '.ejs';
  filename = filename.indexOf(ext) > -1 ? filename.split(ext)[0] : filename;
  try {
    if (isDev) {
      const template = await getTemplateString(`${filename}${ext}`);
      ctx.body = await ctx.renderString(template, data);
    } else {
      await ctx.render(`${filename}${ext}`, data);
    }
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = {
  getTemplateString,
  render,
};

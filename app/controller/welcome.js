const Controller = require('egg').Controller;
const { render } = require('../utils/utils.js');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await render(ctx, 'welcome.ejs', { title: '欢迎页' });
  }
}

module.exports = HomeController;

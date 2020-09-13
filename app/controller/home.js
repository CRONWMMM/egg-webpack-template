'use strict';

const Controller = require('egg').Controller;
// const { render } = require('../utils/utils.js');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const template = render('home.ejs');
    await ctx.render('home.ejs');
  }
}

module.exports = HomeController;

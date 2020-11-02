'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = `你好世界`
    }
}

module.exports = HomeController;

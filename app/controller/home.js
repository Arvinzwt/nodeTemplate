'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const {ctx} = this;

        ctx.body = await ctx.service.user.find(1);
    }
}

module.exports = HomeController;

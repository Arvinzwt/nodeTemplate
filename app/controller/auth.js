'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
    async login() {
        const {ctx} = this;

        ctx.body = await ctx.service.user.find(1);
    }
}
module.exports = AuthController;
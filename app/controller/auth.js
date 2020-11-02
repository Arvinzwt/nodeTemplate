'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

class AuthController extends Controller {
    async login() {
        let {ctx} = this;
        ctx.body = await ctx.service.user.login(ctx.request.body);
    }

    async logout() {
        let {ctx} = this;
        console.log(ctx.request.header.authorization, 'header')

        ctx.body = {
            code: 200,
            data: null,
            msg: null
        }
    }

    async usr() {
        let {ctx} = this;
        ctx.body = await ctx.service.user.find(1);
    }
}

module.exports = AuthController;
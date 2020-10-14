'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hi, egg';
    }

    async home() {
        const list = await this.ctx.service.home.home(10);
        console.log(list)
        await this.ctx.render('home.tpl', {list});
    }
}

module.exports = HomeController;

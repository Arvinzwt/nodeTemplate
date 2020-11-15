'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        await this.ctx.render('index.html');
    }

    async supermarket(){
        await this.ctx.render('supermarket.html');
    }

    async second(){
        await this.ctx.render('second.html');
    }
}

module.exports = HomeController;

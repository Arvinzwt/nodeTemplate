'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        // await this.ctx.render('index.html');
        this.ctx.body={
            msg:'hello world'
        };
    }

    async supermarket(){
        await this.ctx.render('supermarket.html');
    }

    async second(){
        await this.ctx.render('second.html');
    }

    async second2(){
        await this.ctx.render('second2.html');
    }
}

module.exports = HomeController;

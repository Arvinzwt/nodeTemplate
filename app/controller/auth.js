'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

class AuthController extends Controller {
    async login() {
        const {ctx} = this;

        ctx.body = {
            code:200,
            data:{
                token: "i8@39hqzG@A5Ax9d5yQ5ayF#N^^jR$3jpi$rVEh6ZAAd"
            },
            msg:'密码错误'
        }
    }

    async getUser() {
        const {ctx} = this;

        ctx.body = {
            code:401,
            data:await ctx.service.user.find(1),
            msg:'权限失效'
        }

    }

    async logout() {
        const {ctx} = this;

        ctx.body = true
    }

    async d234(){
        const url = 'https://tse4-mm.cn.bing.net/th/id/OIP.WGjYSVCjQAP79P8YyNJn8wHaKW?pid=Api&rs=1';
        const res = await this.ctx.curl(url, {
            streaming: true,
        });

        this.ctx.type = 'jpg';
        this.ctx.body = res.res;
    }

    async dimg(){
        const filePath = path.resolve(this.app.config.static.dir, 'hello.txt');
        this.ctx.header.attachment('hello.txt');
        this.ctx.set('Content-Type', 'application/octet-stream');
        this.ctx.body = fs.createReadStream(filePath);
    }
}

module.exports = AuthController;
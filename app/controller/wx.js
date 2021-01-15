'use strict';

const Controller = require('egg').Controller;

class Wx extends Controller {
    async index() {
        let ctx = this.ctx;
        let appid = 'wx926f0ddbc8857210';
        let secret = '456160a66a4554bec0c5eef97e9067ac';
        let code = ctx.query.code;

        let result = await ctx.curl(`https://api.weixin.qq.com/sns/oauth2/access_token?${this.setParam({
            appid,
            secret,
            code,
            grant_type: 'authorization_code'
        })}#wechat_redirect`, {
            dataType: 'json'
        })
        console.log(ctx.query.state)

        ctx.redirect('http://10.252.26.158:8080/#/pages/curriculum/index');
        // ctx.body = {
        //     result: result.data.openid
        // }

    }

    setParam(data) {
        return Object.keys(data).map(function (key) {
            return key + "=" + data[key];
        }).join("&")
    }

    fn() {
        // let ctx = this.ctx;
        // let appid = 'wx926f0ddbc8857210';
        // let secret = '456160a66a4554bec0c5eef97e9067ac';
        // let code = ctx.query.code;
        //
        // console.log(code)
        //
        // if (!code) {
        //     ctx.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?${this.setParam({
        //         appid,
        //         redirect_uri: encodeURIComponent(`http://10.252.26.158:7001/getOpenId`),
        //         response_type: 'code',
        //         scope: 'snsapi_base',
        //         state: 'STATE'
        //     })}#wechat_redirect`)
        //
        //     return false;
        // }
        //
        // let result = await ctx.curl(`https://api.weixin.qq.com/sns/oauth2/access_token?${this.setParam({
        //     appid,
        //     secret,
        //     code,
        //     grant_type: 'authorization_code'
        // })}#wechat_redirect`, {
        //     dataType: 'json'
        // })
        //
        // // ctx.redirect('http://10.252.26.60:8080/#/?openid=' + result.data.openid);
        // ctx.body = {
        //     result: result.data.openid
        // }
    }
}


module.exports = Wx;
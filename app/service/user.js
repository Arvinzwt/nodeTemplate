'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async login(param) {
        let usr = await this.app.mysql.get('user', param);
        if (!usr) {
            return {
                code: 500,
                data: null,
                msg: '账号或密码错误'
            }
        } else {
            return {
                code: 200,
                data: {
                    ...usr,
                    token:'123123asfjaoksjdnlakjxldakns',
                    rightid:'8,710'
                },
                msg: ''
            }
        }
    }

    async find(uid) {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        return {
            code: 200,
            data: await this.app.mysql.get('user', {hrcode: 1600943}),
            msg: ''
        }
    }
}

module.exports = UserService;

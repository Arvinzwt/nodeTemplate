/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    return {
        keys: appInfo.name + '_1602728128768_8544',

        middleware: [],

        mysql: {
            // 单数据库信息配置
            client: {
                // host
                host: 'localhost',
                // 端口号
                port: '3306',
                // 用户名
                user: 'root',
                // 密码
                password: 'Jx8Rr3&MT',
                // 数据库名
                database: 'crm',
            },
            // 是否加载到 app 上，默认开启
            app: true,
            // 是否加载到 agent 上，默认关闭
            agent: false,
        },

        // 跨域设置
        security: {
            // srf: {
            //     enable: false,
            //     ignoreJSON: true
            // },
            csrf: false
        },
        cors: {
            origin: '*',
            allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
        },

        // jwt登录
        jwt: {
            secret: '_1602728128768_8544',
        },

        // 模板渲染
        view: {
            defaultViewEngine: 'nunjucks',
            mapping: {
                '.html': 'nunjucks',
            },
        }
    };
};

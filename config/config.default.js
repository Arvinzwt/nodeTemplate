/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    return {
        keys: appInfo.name + '_1602665699091_8307',
        csrf: false,
        middleware: ['robot'],
        view: {
            defaultViewEngine: 'nunjucks',
            mapping: {
                '.tpl': 'nunjucks',
            },
        },
        robot: {
            ua: [
                /Baiduspider/i,
            ]
        }
    };
};



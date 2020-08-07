/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path');

module.exports = appInfo => ({
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1596697797032_7830',

    // add your middleware config here
    middleware: [],

    // add your static config here
    static: {
        prefix: '',
        dir: path.join(appInfo.baseDir, 'app/public/dist')
    }
});

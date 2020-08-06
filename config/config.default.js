/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => ({
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1596697797032_7830',

    // add your middleware config here
    middleware: [],
});

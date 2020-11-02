'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);
    router.post('/ool-api/user/v2/base/login', controller.auth.login);
    router.post('/ool-api/user/v2/base/logout', controller.auth.logout);
    router.get('/ool-api/user/v2/base/usr', controller.auth.usr);

    router.get('/mgr-api/v2/basic/grades', controller.dic.grades);
    router.get('/mgr-api/v2/basic/subject', controller.dic.subject1);
    router.get('/mgr-api/v2/basic/leadsstatus', controller.dic.leadsstatus);
    router.get('/mgr-api/v2/basic/bigclass', controller.dic.bigclass);
    router.post('/mgr-api/v2/basic/smallclass', controller.dic.smallclass);
    router.post('/mgr-api/v2/basic/hrcodedepts', controller.dic.hrcodedepts);
    router.post('/mgr-api/v2/basic/sales', controller.dic.sales);
    router.post('/mgr-api/v2/basic/deptsales', controller.dic.deptsales);
};

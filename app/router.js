'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);
    router.post('/api/auth/login', controller.auth.login);
    router.get('/api/auth/user', controller.auth.getUser);
    router.post('/api/auth/logout', controller.auth.logout);
    router.get('/api/auth/dimg', controller.auth.dimg);
};

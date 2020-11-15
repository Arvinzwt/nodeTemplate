'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);
    router.get('/supermarket', controller.home.supermarket);
    router.get('/second', controller.home.second);


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

    router.post('/gxh-leads/v1/Leads/search', controller.customer.leadsSearch);
    // router.post('/gxh-leads/v1/Leads/search', controller.customer.assignCustomer);
    // router.post('/gxh-leads/v1/Leads/search', controller.customer.callCustomer);
    // router.post('/gxh-leads/v1/Leads/todayleads', controller.customer.todayleads);
    // router.post('/gxh-leads/v1/Leads/appointleads', controller.customer.appointleads);
    // router.post('/gxh-leads/v1/Leads/mystudent', controller.customer.mystudent);
    // router.post('/gxh-leads/v1/Leads/detail', controller.customer.detail);
    // router.post('/gxh-leads/v1/LeadsCallCenter/search', controller.customer.search);
    // router.post('/gxh-leads/v1/LeadsCallCenter/detail', controller.customer.leadsCallCenterDetail);
    // router.post('/gxh-leads/v1/LeadsCallCenter/detail', controller.customer.leadsCallCenterUpdate);
    // router.post('/gxh-leads/v1/LeadsTracks/AddUpdateTrack', controller.customer.addUpdateTrack);
    // router.post('/gxh-leads/v1/LeadsTracks/GetTrackListByStudentid', controller.customer.getTrackListByStudentid);
    // router.post('/gxh-leads/v1/LeadsTracks/GetTrackListByPagerStudentid', controller.customer.getTrackListByPagerStudentid);
    // router.post('/gxh-leads/v1/LeadsTracks/GetOwnerRecordByStudentid', controller.customer.getOwnerRecordByStudentid);
    // router.post('/gxh-leads/v1/LeadsTracks/GetOwnerRecordPagerByStudentid', controller.customer.getOwnerRecordPagerByStudentid);
    // router.post('/gxh-leads/v1/PreLeads/reccustomer/search', controller.customer.recommendSearch);
    // router.post('/gxh-leads/v1/PreLeads/reccustomer/detail', controller.customer.recommendDetail);
    // router.post('/gxh-leads/v1/PreLeads/reccustomer', controller.customer.reccustomer);
    // router.post('/gxh-leads/v1/PreLeads/reccustomer/audit', controller.customer.audit);
    // router.post('/gxh-leads/v1/Tag/GetTags', controller.customer.getTags);
    // router.post('/gxh-leads/v1/Tag/NewTag', controller.customer.newTag);
    // router.post('/gxh-leads/v1/Tag/UpdateTagInfo', controller.customer.updateTagInfo);
    // router.post('/gxh-leads/v1/Tag/DeleteRegisteredTag', controller.customer.deleteRegisteredTag);
    // router.post('/gxh-leads/v1/Tag/BindingTag', controller.customer.bindingTag);
    // router.post('/gxh-leads/v1/Tag/UntyingTag', controller.customer.untyingTag);
    // router.post('/gxh-leads/v1/Tag/TagChange', controller.customer.tagChange);
    // router.post('/gxh-leads/v1/Visit/GetCallCCCenterList', controller.customer.getCallCCCenterList);
    // router.post('/gxh-leads/v1/Visit/confirm', controller.customer.confirm);
    // router.post('/gxh-leads/v1/Visit/UploadReport', controller.customer.uploadReport);
};

'use strict';

const Controller = require('egg').Controller;

class DiController extends Controller {
    async grades() {
        let {ctx} = this;
        ctx.body = {
            "data": [
                {
                    "dicCode": "一年级",
                    "dicValue": "一年级",
                    "name": "一年级",
                },
                {
                    "dicCode": "二年级",
                    "dicValue": "二年级",
                    "name": "二年级",
                }
            ],
            "code": 200,
            "showmsg": true,
            "msg": "string"
        }
    }

    async subject1() {
        let {ctx} = this;
        ctx.body = {
            "data": [
                {
                    "dicCode": "数学",
                    "dicValue": "数学",
                    "name": "数学",
                },
                {
                    "dicCode": "语文",
                    "dicValue": "语文",
                    "name": "语文",
                }
            ],
            "code": 200,
            "showmsg": true,
            "msg": "string"
        }
    }

    async leadsstatus() {
        let {ctx} = this;
        ctx.body = {
            "data": [
                {
                    "dicCode": "状态很好",
                    "dicValue": "状态很好",
                    "name": "状态很好",
                    "child": []
                },
                {
                    "dicCode": "状态很坏",
                    "dicValue": "状态很坏",
                    "name": "状态很坏",
                    "child": []
                }
            ],
            "code": 200,
            "showmsg": true,
            "msg": "string"
        }
    }

    async bigclass() {
        let {ctx} = this;
        ctx.body ={
            "data": [
                {
                    "classid": 0,
                    "classname": "渠道大类1"
                },
                {
                    "classid": 1,
                    "classname": "渠道大类2"
                },
                {
                    "classid": 3,
                    "classname": "渠道大类3"
                }
            ],
            "code": 200,
            "showmsg": true,
            "msg": "string"
        }
    }

    async smallclass() {
        let {ctx} = this;
        ctx.body = {
            "data": [
                {
                    "bigclassid": 0,
                    "bigclassname": "渠道小类1",
                    "deptid": 0,
                    "deptname": "渠道小类1",
                    "classid": 0,
                    "classname": "渠道小类1"
                },
                {
                    "bigclassid": 1,
                    "bigclassname": "渠道小类2",
                    "deptid": 1,
                    "deptname": "渠道小类2",
                    "classid": 1,
                    "classname": "渠道小类2"
                }
            ],
            "code": 200,
            "showmsg": true,
            "msg": "string"
        }
    }

    async hrcodedepts() {
        let {ctx} = this;
        ctx.body ={
            "data": [
                {
                    "chlid": [
                        {
                            "deptid": 1,
                            "deptcode": "校区1",
                            "parid": 1,
                            "deptname": "校区1",
                            "bigregcode": "校区1",
                            "bigregname": "校区1",
                            "bigregid": 1
                        },
                        {
                            "deptid": 2,
                            "deptcode": "校区2",
                            "parid": 2,
                            "deptname": "校区2",
                            "bigregcode": "校区2",
                            "bigregname": "校区2",
                            "bigregid": 2
                        },{
                            "deptid": 3,
                            "deptcode": "校区3",
                            "parid": 3,
                            "deptname": "校区3",
                            "bigregcode": "校区3",
                            "bigregname": "校区3",
                            "bigregid": 3
                        }
                    ],
                    "deptid": 0,
                    "deptcode": "校区1",
                    "parid": 0,
                    "deptname": "校区1",
                    "bigregcode": "校区1",
                    "bigregname": "校区1",
                    "bigregid": 0
                }
            ],
            "code": 200,
            "showmsg": true,
            "msg": "string"
        }
    }

    async sales() {
        let {ctx} = this;
        ctx.body = {
            "data": [
                {
                    "id": 0,
                    "name": "教育顾问1",
                    "type": 0,
                    "deptid": 0,
                    "hrcode": "教育顾问1"
                },
                {
                    "id": 1,
                    "name": "教育顾问2",
                    "type": 1,
                    "deptid": 1,
                    "hrcode": "教育顾问2"
                }
            ],
            "code": 200,
            "showmsg": true,
            "msg": "string"
        }
    }

    async deptsales() {
        let {ctx} = this;
        ctx.body = {
            "data": [
                {
                    "id": 0,
                    "name": "教育顾问1",
                    "type": 0,
                    "deptid": 0,
                    "hrcode": "教育顾问1"
                },
                {
                    "id": 1,
                    "name": "教育顾问2",
                    "type": 1,
                    "deptid": 1,
                    "hrcode": "教育顾问2"
                }
            ],
            "code": 200,
            "showmsg": true,
            "msg": "string"
        }
    }

}

module.exports = DiController;
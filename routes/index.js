var express = require('express');
var router = express.Router();
const db = require('../models/database');

/* GET home page. */
router.get('/', function (req, res, next) {
    // 插入数据
    // db.operating("INSERT INTO user(id,name,age,address,created_time,updated_time) VALUES(1,?,?,?,?,?)", ['王二', 20, "上海浦东", "2017-09-08", "2017-09-09"], (result, fields) => {
    //     res.send({
    //         results: result
    //     });
    // });


    // 删除数据
    // db.operating("DELETE FROM user where id=0", [], (result, fields) => {
    //     res.send({
    //         results: result
    //     });
    // });

    // 更新数据
    // db.operating("UPDATE user SET name = ?,age = ? WHERE Id = ?", ["赵大", 10, 0], (result, fields) => {
    //     res.send({
    //         results: result
    //     });
    // });

    // 查询
    // db.operating("SELECT * FROM user WHERE id =?", 0, (result, fields) => {
    //     res.send({
    //         results: result
    //     });
    // });

    res.send({
        results: true
    });

});

router.post('/login', function (req, res, next) {
    res.send({
        title: '标题内容'
    });
});

module.exports = router;

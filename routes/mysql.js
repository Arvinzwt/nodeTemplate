const express = require('express');
const router = express.Router();
const mysql = require('mysql');

function searchMysql(select, callback) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Jx8Rr3&MT',
        database: 'notebook'
    })
    connection.connect()
    connection.query(select, function (err, rows, fields) {
        if (err) {
            callback({
                code: 500,
                mes: err,
                data: []
            })
        }
        callback({
            code: 200,
            mes: 'error',
            data: rows
        })
    })
    connection.end()
}

// 获取列表
router.post('/getList', async function (req, res, next) {
    let query = req.body.query;
    searchMysql(`SELECT * FROM notebook WHERE LOCATE('${query}',title)`, function (rows) {
        res.send({
            rows
        })
    })
})

// 新增数据
router.post('/addList', async function (req, res, next) {
    let query = req.body;
    searchMysql(`INSERT INTO notebook (title,checked) VALUES ('${query.title}',${query.checked});`, function (rows) {
        res.send({
            rows
        })
    })
})

// 删除数据
router.post('/deleteList', async function (req, res, next) {
    let query = req.body;
    searchMysql(`DELETE FROM notebook WHERE id = ${query.id};`, function (rows) {
        res.send({
            rows
        })
    })
})

// 拉取详情
router.post('/getDetail', async function (req, res, next) {
    let query = req.body;
    searchMysql(`SELECT * FROM notebook WHERE id = ${query.id}`, function (rows) {
        let target;
        if (rows.data.length > 0) {
            target = rows.data[0];
        } else {
            target = {}
        }

        res.send({
            rows: target
        })
    })
})

// 编辑数据
router.post('/editList', async function (req, res, next) {
    let query = req.body;
    searchMysql(`UPDATE notebook SET title = '${query.title}',checked = ${query.checked}  WHERE id = ${query.id};`, function (rows) {
        let target;
        if (rows.data.length > 0) {
            target = rows.data[0];
        } else {
            target = {}
        }

        res.send({
            rows: target
        })
    })
})



module.exports = router;

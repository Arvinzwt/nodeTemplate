const express = require('express');
const router = express.Router();
var mysql = require('mysql')



router.post('/mysql', async function (req, res, next) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Jx8Rr3&MT',
        database: 'crm'
    })
    connection.connect()

    let hrcode = req.body.hrcode
    connection.query(`SELECT * FROM user WHERE hrcode =${hrcode}`, function (err, rows, fields) {
        if (err) throw err

        res.send({
            url:rows
        })
    })

    connection.end()


})


module.exports = router;

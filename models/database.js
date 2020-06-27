const mysql = require('mysql');
const config = require('./config');


module.exports = {
    operating: (sql, params, callback) => {
        //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
        const connection = mysql.createConnection(config);

        connection.connect((err) => {
            if (err) {
                console.log('数据库链接失败');
                throw err;
            }

            connection.query(sql, params, function (err, rows, fields) {
                if (err) {
                    console.log('数据操作失败',err);
                    throw err;
                } else {
                    callback(rows)
                }
            });

            connection.end(err => {
                if (err) {
                    console.log('关闭数据库连接失败！');
                    throw err;
                }
            });

        });
    }
};

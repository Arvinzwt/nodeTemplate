var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: ''});
});

router.post('/login', function (req, res, next) {
    res.send({
        title: '标题内容'
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/lc', function (req, res, next) {
    res.render('leetcood', {title: 'Express'});
});

module.exports = router;

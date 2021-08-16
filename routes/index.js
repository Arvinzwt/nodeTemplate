var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get("/pages/:aid", function (req, res) {
    res.render(`pages/${req.params.aid}`, {title: req.params.aid});
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/pdfCreate', function (req, res, next) {
    res.send({
        aa: 123
    });
})

module.exports = router;
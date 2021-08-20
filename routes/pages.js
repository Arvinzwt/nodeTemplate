var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

router.get("/:aid", function (req, res) {
    res.render(`pages/${req.params.aid}`, {title: req.params.aid});
});

router.post("/all", function (req, res) {
    res.send({
        list:fs.readdirSync(path.join(__dirname, '../views/pages'))
    })
});

module.exports = router;

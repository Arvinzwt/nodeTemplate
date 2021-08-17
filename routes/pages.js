var express = require('express');
var router = express.Router();

router.get("/:aid", function (req, res) {
    res.render(`pages/${req.params.aid}`, {title: req.params.aid});
});

module.exports = router;

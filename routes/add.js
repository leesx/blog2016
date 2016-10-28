var express = require('express');
var router = express.Router();
var db = require('./../common/db')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req)
    res.render('add');

});

module.exports = router;

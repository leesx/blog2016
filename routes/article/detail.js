var express = require('express');
var url = require('url')
var mongoose = require('mongoose');
var router = express.Router();
var db = require('./../../common/db')

/* 文章详情 */
router.get('/', function(req, res, next) {


    var id = url.parse(req.url,true).query.id
    console.log("++++++++++++++",db)
    db.collection('articles').findOne({_id:mongoose.Types.ObjectId(id)},function(err, result) {
      if (err) throw err;
      console.log('-----','详情',result);
      res.render('article/detail', { detail: result });
    });

});

module.exports = router;

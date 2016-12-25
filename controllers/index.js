var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var db = require('./../common/db')

exports.index = function(req, res, next) {
    db.collection('articles').find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log('-----',result);
      res.render('index', { news_lists: result });
    });

}

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var db = require('./../common/db')

exports.index = function(req, res, next) {
    res.render('article/add')
}

exports.list = function(req, res, next) {
  console.log('==列表===')
    db.collection('articles').find({}).toArray(function(err, result) {
      if (err) throw err;
      //console.log('-----',result);
      res.render('article/list', { news_lists: result });
    });
}

exports.detail = function(req, res, next) {
  console.log("++++++++++++++",req.query)
    var id = req.query.id

    db.collection('articles').findOne({_id:mongoose.Types.ObjectId(id)},function(err, result) {
      if (err) throw err;
      console.log('-----','详情',result);
      res.render('article/detail', { detail: result });
    });
}

exports.add = function(req, res, next) {
    console.log('================',req.body)
    var params = JSON.parse(req.body.params)
    console.log(params)
    db.collection('articles').insert(params,function(err, result) {
      if (err) throw err;
      console.log('-----',result);
      res.send({ rs:'ok' });
    });
}

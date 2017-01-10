var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var objectIdToTimestamp = require('objectid-to-timestamp');
var moment = require('moment');
moment.locale('zh-CN');
var db = require('./../common/db')

exports.index = function(req, res, next) {
  console.log('=====session',req.session.isLogin)
  db.collection('articles').find({}).toArray(function(err, result) {
    if (err) throw err;
    var resultArr = []
    var ids =[]
    for(var i=0;i<result.length;i++){
      var obj = {}
      var timestamp = objectIdToTimestamp(result[i]._id)
      var time = null


      if((Date.now() - timestamp) < 1*60*60*1000){
        //小于1小时
        time = moment(timestamp).startOf('hour').fromNow()
      }else if((Date.now() - timestamp) < 1*60*1000){
        //小于一分钟
        time = '刚刚'
      }else{
        time = moment(timestamp).format('YYYY-MM-DD')
      }
      result[i].createTime = time
      resultArr.push(result[i])
      //ids.push(result[i]._id)
      // db.collection('comments').find({arId:result[i]._id.toString()}).toArray(function(err, commentsResult) {
      //   if (err) throw err;
      //   commentsArr.push(commentsResult.length)
      // });
      //console.log(commentsArr,'===================')
    }

    res.render('index', { articles: resultArr });
  });

}

exports.likes = function(req, res, next) {
  var id = req.body.id
  var likes = req.body.likes
  db.collection('articles').update({_id:mongoose.Types.ObjectId(id)},{$set:{likes:likes}},function(err, result) {
    if (err) throw err;
    res.send({rs:true,likes:likes});
  });

}

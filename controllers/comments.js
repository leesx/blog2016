var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var db = require('./../common/db')

exports.index = function(req, res, next) {
    res.render('comment/index')
}

exports.add = function(req, res, next) {

  // POST 请求在req.body中取值
  //GET 请求在req.params中取值
  //var params = JSON.parse(req.body)
  //console.log('========',params)
  db.collection('comments').insert(req.body,function(err, result) {
    if (err) throw err;
    //注意 最后返回的结果 是res.send()方法
    res.send({ rs:'ok' });
  });
}

exports.list = function(req, res, next) {
  console.log('评论',req.params)
  // POST 请求在req.body中取值
  //GET 请求在req.params中取值
  //var params = JSON.parse(req.body)
  //console.log('========',params)
  db.collection('comments').find({arId:req.params.id}).toArray(function(err, result) {
    if (err) throw err;
    console.log('评论列表',result);
    //注意 最后返回的结果 是res.send()方法
    res.render('article/detail',{comments:result})
  });
}

exports.reply = function(req,res,next){
  var id = req.body.repId
  var repCont = req.body.repCont
  db.collection('comments').update(
    {
      _id:mongoose.Types.ObjectId(id)
    },
    {
      $push:{replys:{repCont:repCont,repTime:Date.now()}}
    },function(err,result){
    if(err) throw err;
    res.send({rs:true,msg:'回复成功'})
  })
}

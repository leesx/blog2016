var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var router = express.Router();
var formidable = require('formidable');
var sha1 = require('sha1');
var db = require('./../common/db')

exports.reg = function(req, res, next) {
  res.render('user/reg')
}

exports.regApi = function(req, res, next){

  var username = req.body.username
  var password = sha1(req.body.password)
  db.collection('user').findOne({username:username},function(err,result){
    if(err) throw err;
    console.log(result,'=====')
    if(result !== null && result._id){
      res.send({
        rs:0,
        error:'用户名已经占用',
      })
    }

    var user = {

    }
    // 将用户信息存入 session
    //delete user.password;
    var user = {}
    user.username = username
    req.session.user = user
    db.collection('user').insert({username:username,password:password},function(err, result) {
      if (err) throw err;
      //console.log('-----',result);
      //注意 最后返回的结果 是res.send()方法
      res.send({ rs:1 });
    });
  })

}


exports.login = function(req, res, next) {
  res.render('user/login')
}

exports.loginApi = function(req, res, next){

  var username = req.body.username
  var password = sha1(req.body.password)
  db.collection('user').findOne({username:username,password:password},function(err,result){
    if(err) throw err;
    console.log(result,'=====')
    if(result){
      res.send({rs:1})
    }
  })

}

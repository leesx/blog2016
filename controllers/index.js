var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var objectIdToTimestamp = require('objectid-to-timestamp');
var moment = require('moment');
moment.locale('zh-CN');
import {db}  from './../common/db'

export const index = (req, res, next)=> {
  console.log('=====session',req.session.isLogin)
  db.collection('articles').find({}).toArray((err, result)=>{
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

    }

    res.render('index', { articles: resultArr });
  });

}

export const likes = (req, res, next)=>{
  var id = req.body.id
  var likes = req.body.likes
  db.collection('articles').update({_id:mongoose.Types.ObjectId(id)},{$set:{likes:likes}},(err, result)=>{
    if (err) throw err;
    res.send({rs:true,likes:likes});
  });

}

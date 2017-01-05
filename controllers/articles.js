var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var router = express.Router();
var formidable = require('formidable');
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
    var data = {}
    db.collection('articles').findOne({_id:mongoose.Types.ObjectId(id)},function(err, result) {
      if (err) throw err;
      console.log('-----','详情',result);
      data.detail = result
      //res.render('article/detail', { detail: result });

    });

    db.collection('comments').find({arId:id}).toArray(function(err, result) {
      if (err) throw err;
      
      data.comments = result
      console.log('评论列表',result);
      //注意 最后返回的结果 是res.send()方法
      res.render('article/detail',data)
    });

}

exports.update = function(req, res, next) {
    var id = req.query.id

    db.collection('articles').findOne({_id:mongoose.Types.ObjectId(id)},function(err, result) {
      if (err) throw err;
      res.render('article/update', { detail: result });
    });
}

exports.update2 = function(req, res, next) {

    // POST 请求在req.body中取值
    //GET 请求在req.params中取值
    var params = JSON.parse(req.body.params)
    console.log(params)
    db.collection('articles').update({_id:mongoose.Types.ObjectId(params.id)},params.params,function(err, result) {
      if (err) throw err;
      console.log('-----',result);
      //注意 最后返回的结果 是res.send()方法
      res.send({ rs:'ok' });
    });
}

exports.add = function(req, res, next) {
    console.log('================',req)
    // POST 请求在req.body中取值
    //GET 请求在req.params中取值
    var params = JSON.parse(req.body.params)
    console.log(params)
    db.collection('articles').insert(params,function(err, result) {
      if (err) throw err;
      console.log('-----',result);
      //注意 最后返回的结果 是res.send()方法
      res.send({ rs:'ok' });
    });
}

exports.upload = function(req, res, next) {
    console.log('上传================',req)
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        console.log('==========',fields, files)
        // 从临时目录读取文件的内容
        var fileContent = fs.readFileSync(files.myfile.path)

        //把读取的内容写到当前文件夹下,文件名叫做 files.myfile.name
        var filename = Date.now() + files.myfile.name
        fs.writeFileSync('./public/upload/' + filename, fileContent)

        //写入响应中
        // res.write(files.myfile.name);
        //
        // filename = files.myfile.name;

        res.send('/upload/' + filename);
    })

}

exports.remove = function(req,res,next){
  var id = req.body.id
  console.log(req.body.id)
  db.collection('articles').remove({_id:mongoose.Types.ObjectId(id)},function(err, result) {
    if (err) throw err;
    console.log('-----','删除',result);
    res.send({ rs:'ok' });
  });
}

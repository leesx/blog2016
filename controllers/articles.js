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

    db.collection('articles').findOne({_id:mongoose.Types.ObjectId(id)},function(err, result) {
      if (err) throw err;
      console.log('-----','详情',result);
      res.render('article/detail', { detail: result });
    });
}

exports.add = function(req, res, next) {
    console.log('================',req)
    var params = JSON.parse(req.body.params)
    console.log(params)
    db.collection('articles').insert(params,function(err, result) {
      if (err) throw err;
      console.log('-----',result);
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
        fs.writeFileSync('./public/upload/' + Date.now() + files.myfile.name, fileContent)

        //写入响应中
        // res.write(files.myfile.name);
        //
        // filename = files.myfile.name;

        res.send('/upload/' + files.myfile.name);
    })

}

var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var router = express.Router();
var objectIdToTimestamp = require('objectid-to-timestamp');
var moment = require('moment');
moment.locale('zh-CN');
//objectIdToTimestamp('563229dd1ee6030100644cbe');// 1446128093391
var formidable = require('formidable');
var db = require('./../common/db')

var getTimeStr = function(now,timestamp){
  var time = null
  if((now - timestamp) < 1*60*1000){
    //小于一分钟
    time = '刚刚'
  }else if((now - timestamp) < 1*60*60*1000){
    //小于1小时
    time = moment(timestamp).startOf('hour').fromNow()
  }else {
    time = moment(timestamp).format('YYYY-MM-DD')
  }

  return time
}

exports.search = function(req, res, next){
  var keyword = req.query.keyword

  db.collection('articles').find({$or:[{title:{$regex:keyword}},{content:{$regex:keyword}}]}).toArray(function(err, result) {

      var replaceresult= result.map(function(item){
        var regex = new RegExp(keyword,'ig')
        var reTitle = item.title.replace(regex,'<span class="search-tag">'+keyword+'</span>')
        var reContent = item.content.replace(regex,'<span class="search-tag">'+keyword+'</span>')
        console.log(reTitle)
        return {
          _id:item._id,
          title:reTitle,
          content:reContent,
          img:item.img
        }
      })

      res.render('article/search', { articles: replaceresult });
  })
}
exports.index = function(req, res, next) {
  var category = req.query.category
  console.log('============',category)
  db.collection('articles').find({category:category}).toArray(function(err, result) {
    if (err) throw err;
    var resultArr = []
    for(var i=0;i<result.length;i++){
      var obj = {}
      var timestamp = objectIdToTimestamp(result[i]._id)
      var time = null

      console.log(Date.now() - timestamp)
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
    res.render('article', { articles: resultArr });
  });
}

exports.add = function(req, res, next) {
    res.render('article/add')
}

exports.list = function(req, res, next) {
    db.collection('articles').find({}).toArray(function(err, result) {
      if (err) throw err;
      var resultArr = []
      for(var i=0;i<result.length;i++){
        var obj = {}
        var timestamp = objectIdToTimestamp(result[i]._id)
        var time = null

        console.log(Date.now() - timestamp)
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
      res.render('article/list', { news_lists: resultArr });
    });
}



exports.detail = function(req, res, next) {
    var id = req.query.id
    var articlesData = null
    db.collection('articles').findOne({_id:mongoose.Types.ObjectId(id)},function(err, articlesResult) {
      if (err) throw err;
      console.log('-----','详情',articlesResult);

      db.collection('comments').find({arId:id}).toArray(function(err, result) {
        if (err) throw err;
        var resultArr = []
        for(var i=0;i<result.length;i++){
          var obj = {}
          var timestamp = objectIdToTimestamp(result[i]._id)
          var time = null

          // console.log(Date.now() - timestamp)
          // if((Date.now() - timestamp) < 1*60*1000){
          //   //小于一分钟
          //   time = '刚刚'
          // }else if((Date.now() - timestamp) < 1*60*60*1000){
          //   //小于1小时
          //   time = moment(timestamp).startOf('hour').fromNow()
          // }else {
          //   time = moment(timestamp).format('YYYY-MM-DD')
          // }
          result[i].createTime = getTimeStr(Date.now(),timestamp)
          if(result[i].replys && result[i].replys.length){
            var replysArr = []
            for(var j=0;j<result[i].replys.length;j++){
              replysArr.push( {
                repCont:result[i].replys[j].repCont,
                repTime:getTimeStr(Date.now(),result[i].replys[j].repTime)
              })
            }
            result[i].replys = replysArr
          }

          resultArr.push(result[i])
        }
        //注意 最后返回的结果 是res.send()方法
        res.render('article/detail',{comments:resultArr,detail:articlesResult})
      });

    });



}

exports.update = function(req, res, next) {
    var id = req.query.id

    db.collection('articles').findOne({_id:mongoose.Types.ObjectId(id)},function(err, result) {
      if (err) throw err;
      res.render('article/update', { detail: result });
    });
}

exports.articleUpdate = function(req, res, next) {

    // POST 请求在req.body中取值
    //GET 请求在req.params中取值
    var id = req.body.id
    var title = req.body.title
    var author = req.body.author
    var category = req.body.category
    var content = req.body.content
    var img = req.body.img
    db.collection('articles').update({_id:mongoose.Types.ObjectId(id)},{$set:{
      title:title,
      author:author,
      category:category,
      content:content,
      img:img,
    }},function(err, result) {
      if (err) throw err;
      console.log('-----',result);
      //注意 最后返回的结果 是res.send()方法
      res.send({ rs:'ok' });
    });
}

exports.create = function(req, res, next) {

    // POST 请求在req.body中取值
    //GET 请求在req.params中取值
    var title = req.body.title
    var author = req.body.author
    var category = req.body.category
    var content = req.body.content
    var img = req.body.img
    console.log(params)
    db.collection('articles').insert({
      title:title,
      author:author,
      category:category,
      content:content,
      img:img,
    },function(err, result) {
      if (err) throw err;
      //console.log('-----',result);
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

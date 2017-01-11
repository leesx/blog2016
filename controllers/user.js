import mongoose from'mongoose';
console.log(mongoose)
import { ObjectID } from 'mongodb';
import {db}  from './../common/db'
import sha1 from 'sha1';


export const reg = (req, res, next)=>{
  res.render('user/reg')
}

export const regApi = (req, res, next)=>{

  const username = req.body.username
  const password = sha1(req.body.password)

db.collection('user')
  .findOne({username:username},(err,result)=>{
    if(err) throw err;
    if(result !== null && result._id){
      res.send({
        rs:0,
        error:'用户名已经占用',
      })
    }

    const user = {}
    // 将用户信息存入 session
    //delete user.password;
    user.username = username
    req.session.user = user
    db.collection('user')
      .insert({username:username,password:password},(err, result)=>{
        if (err) throw err;
        //console.log('-----',result);
        //注意 最后返回的结果 是res.send()方法
        res.send({ rs:1 });
      });
  })

}


export const login = (req, res, next)=>{
  res.render('user/login')
}

export const loginApi = (req, res, next)=>{

  const username = req.body.username
  const password = sha1(req.body.password)
  db.collection('user')
    .findOne({username:username,password:password},(err,result)=>{
      if(err) throw err;

      if(result){
        req.session.isLogin = 1;
        res.send({rs:1})
      }
    })

}

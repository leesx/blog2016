//var db = require('mongoskin').db('mongodb://10.10.3.188:27017/blog');
//var db = require('mongoskin').db('mongodb://127.0.0.1:27017/blog');
import mongoskin from 'mongoskin'

console.log(mongoskin.ObjectID('586c65872263a5729e248fa6'))
export const db = mongoskin.db('mongodb://127.0.0.1:27017/blog');
export const ObjectID = mongoskin.ObjectID

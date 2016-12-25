var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var db = require('./../common/db')

exports.index = function(req, res, next) {
    res.render('member/index')
}
